import {Button, Row} from "react-bootstrap";
import {addTodo} from "../store/TodoSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {nanoid} from "@reduxjs/toolkit";

function AddTodo(){


    const {isAuthenticated, user} = useSelector((state) => state.auth);

    const [todo, setTodo] = useState("");
    const dispatch = useDispatch();
    const submitHandle = e => {
        e.preventDefault();
        const todoItem = {
            status: 'pending',
            name: todo,
            user: user.email,
            id: nanoid()
        }
        dispatch(addTodo(todoItem))
        setTodo("")
    }
    return (
        <>
            <form style={{marginBottom: "15px"}} onSubmit={submitHandle}>
                <Row>
                    <div className=" col-sm-10">
                        <input type="text" className="form-control" value={todo} onChange={e => setTodo(e.target.value)}/>
                    </div>
                    <div className="col-sm-2">
                        <Button variant="dark"  className="form-control" disabled={!todo || !isAuthenticated} type="submit">Ekle</Button>
                    </div>
                </Row>

            </form>
        </>
    )
}

export default AddTodo;