import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos = [
                action.payload,
                ...state.todos
            ]
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        moveTodo: (state, action) => {
            let updatedTodo = state.todos.find(item => item.id === action.payload.id)
            let existsStatusData = state.todos.filter(item => item.status === action.payload.status);

            state.todos = state.todos.filter(item => item.status !== action.payload.status)

            if (action.payload.status === updatedTodo.status) {
                existsStatusData = existsStatusData.filter(item => item.id !== action.payload.id)
                existsStatusData.splice(action.payload.order, 0, updatedTodo);
            } else {
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
                updatedTodo.status = action.payload.status;
                existsStatusData.splice(action.payload.order, 0, updatedTodo);
            }
            state.todos = [
                ...state.todos,
                ...existsStatusData
            ]
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        removeAll: (state, action) => {
            state.todos = [];
            localStorage.setItem("todos", JSON.stringify([]))
        }
    }
})

export const {removeAll, addTodo, removeTodo, moveTodo} = todoSlice.actions
export default todoSlice.reducer