import React from 'react'
import { Store } from '../../store'
import './todo.scss'
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../../store/slices/todo.slice';
import { api } from '../../apis';
import { Modal } from 'antd';
export default function Todo() {
    const dispatch = useDispatch();
    const todoStore = useSelector((store: Store) => store.todoStore)
    async function createTodo(e: React.FormEvent) {
        e.preventDefault();
        try {
            const name = (e.target as any).name.value;
            if (!name) {
                alert("Please fill in all fields");
                return;
            }
            const newTodo = {
                name
            }
            let res = await api.todo.create(newTodo);
            if (res.status == 200) {
                Modal.success({
                    title: "Successfully created",
                    onOk: () => {
                        (e.target as any).name.value = "";

                        dispatch(todoAction.addTodo(res.data.data))
                    }
                })
            }
        } catch (err: any) {
            console.log(err);

            Modal.error({
                title: "Error",
                content: err.response?.data?.message || "Unknown error!"
            })
        }
    };
    async function deleteTodo(id: number) {
        Modal.confirm({
            title: 'Notice',
            content: 'Delete this task?',
            async onOk() {
                try {
                    await api.todo.delete(id);
                    dispatch(todoAction.delete(id));

                } catch (err) {
                    console.log("Error when deleting task", err);
                }
            },
            onCancel() {

            },
        });
    }
    async function editTodo(id: number) {
        try {
            let res = await api.todo.edit(id)
            if (res.status == 200) {
                Modal.confirm({
                    title: 'Notice',
                    content: 'Has the task been completed?',
                    async onOk() {
                        try {
                            dispatch(todoAction.toggleComplete(res.data.data));

                        } catch (err) {
                            console.log("Error when executing", err);
                        }
                    },
                })

            }

        } catch (err) {
            console.log("Failed to edit");

        }
    }
    return (
        <div className='main-box'>
            <div className='content-box'>
                <h2>Todo List</h2>
                <p>Get things done, one item at a time</p>
                <div className='line'>

                </div>
            </div>
            <div>
                <ul>
                    {todoStore.list?.map((todo) => (
                        <div className='todo-box'>
                            <li key={todo.id}>
                                <span style={{ textDecoration: todo.status == 'completed' ? 'line-through' : 'none' }}>
                                    {todo.name}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={todo.status == 'completed'}
                                    onChange={() => editTodo(todo.id)}
                                />
                                <button onClick={() => deleteTodo(todo.id)}><ion-icon name="trash"></ion-icon></button>
                            </li>
                        </div>

                    ))}
                </ul>
                <div className='main-tog'>
                    <div className='box-tog'>
                        <p>Move done items to the end</p>
                        <input type="checkbox" id="toggle" />
                        <label htmlFor="toggle"></label>
                    </div>

                </div>

            </div>
            <form onSubmit={(e) => {
                createTodo(e)
            }} >
                <div className='add-box'>
                    <div>
                        <h5>Add to the todo list</h5>
                    </div> 
                    <input type="text" id='name' name='name' />
                    <button type="submit">Add item</button>
                </div>
                <div className='add-box2'>

                </div>

            </form>

        </div>

    )
}
