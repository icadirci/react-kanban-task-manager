import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, ListGroup} from "react-bootstrap";
import  {removeTodo} from "../store/TodoSlice";

function TodoList(){
    const {todos} = useSelector((state) => state.todos);
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <>
            <ListGroup>
                {todos.map((todo, key) => {
                    return <ListGroup.Item key={key}>
                        <div className="row">
                            <span className="col-11">{todo.name} - <Badge pill bg="danger">{todo.status}</Badge></span>
                            <Button variant="danger" onClick={(e) => dispatch(removeTodo(todo.id))} className="col-1">X</Button>
                        </div>
                    </ListGroup.Item>
                } )}
            </ListGroup>
        </>
    )
}

export default TodoList;