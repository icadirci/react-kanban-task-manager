import {Button, ButtonGroup, Card} from "react-bootstrap";
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, removeAll, moveTodo} from "../store/TodoSlice";
import {nanoid} from "@reduxjs/toolkit";

function Dashboard() {
    const {todos} = useSelector((state) => state.todos);
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const onDragEnd = (result) => {
        const {source, destination, draggableId} = result;

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        dispatch(moveTodo({
            id: draggableId,
            status: destination.droppableId,
            order: destination.index,
            oldOrder: source.index
        }))

    };


    const getStatusTitle = (status) => {
        switch (status) {
            case 'pending':
                return 'Beklemede';
            case 'inProgress':
                return 'Devam Ediyor';
            case 'completed':
                return 'Tamamlandı';
            default:
                return '';
        }
    };

    const getBoardBgColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-dark';
            case 'inProgress':
                return 'bg-info';
            case 'completed':
                return 'bg-primary';
            default:
                return '';
        }
    };


    const getTodosByStatus = (status) => {
        return todos.filter(task => task.status === status)
    }

    const generateTask = () => {
        let tasks = [1,2,3,4,5,6,7,8,9,10]
        tasks.forEach(item => {
            const todoItem = {
                status: 'pending',
                name: item,
                user: user.email,
                id: nanoid(),
                order: 99
            }
            dispatch(addTodo(todoItem))
        })
    }

    const deleteAll = () => {
        dispatch(removeAll())
    }

    return (
        <>
            <ButtonGroup size="sm" className="mb-2">
                <Button onClick={generateTask}>Generate Task</Button>
                <Button variant="danger" onClick={deleteAll}>Delete All</Button>
            </ButtonGroup>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">
                    <div className="row">
                        {['pending', 'inProgress', 'completed'].map(status => (
                            <div key={status} className='col-md-4'>
                                <div className={getBoardBgColor(status)} style={{padding: '10px'}}>
                                    <h3 className="text-white">{getStatusTitle(status)}</h3>
                                    <hr/>
                                    <Droppable droppableId={status}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}
                                                 className="task-column">
                                                {getTodosByStatus(status).map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="mb-3"
                                                            >
                                                                <Card>
                                                                    <Card.Body>{task.name}</Card.Body>
                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </DragDropContext>
        </>
    )
}

export default Dashboard;