import Header from "../components/Header";

import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

function Home() {



    return (
        <>
            <Header/>
            <AddTodo />
            <TodoList/>
        </>
    )
}

export default Home;