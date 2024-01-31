import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import './task.scss';
import api from '@services/apis';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { randomId, getDateInfo } from '@mieuteacher/meomeojs';
import { Modal } from 'antd';
import { todoActions } from '../../store/slices/todolist.slice';
import { Store } from '@/store';
export default function Task() {
 const dispatch = useDispatch();
    const todotStore = useSelector((store:Store )=> store.todoStore);
 const [editingTask, setEditingTask] = useState({
        id: null,
        name: '',
    });
    async function handleAddTodo(e: React.FormEvent) {
   e.preventDefault();
        try {
            let newlist = {
                name:(e.target as any).name.value,
            };
            console.log(newlist);
            let result = await api.todo.create(newlist);
            console.log("result", result);
            Modal.confirm({
                title: "thông tin",
                content: "đã tạo",
                onOk: () => {
                    dispatch(todoActions.addTodo(result.data.data));
                    (e.target as any).name.value = "";
                },
            });
        } catch (err) {
            console.log(err);
        }

    }
    // async function handleUpdate(e: React.FormEvent, id:number) {
    //     e.preventDefault();
    //     try {
    //         let updateNew = {
    //             name: editingTask.name,
    //         };
    //         console.log("updateNew", updateNew);
    //         let result = await api.todo.update(id, updateNew);
    //         console.log("result", result);
    //         Modal.confirm({
    //             title: "notification",
    //             content: "Bạn muốn thay đổi không ?",
    //             onOk: () => {
    //                 dispatch(todoActions.updateTodo({ id: id, data: updateNew }));

    //                 setEditingTask({ name: "" });
    //             },
    //         });
    //     } catch (err) {
    //         console.log("Không update được", err);
    //     }
    // }
    const handleDeleteDo = (todo:any) => {
        Modal.confirm({
            title: 'Thông báo',
            content: 'bạn có muốn xóa công việc này không ?',
            async onOk() {
                try {
                    await api.todo.delete(todo.id);
                    dispatch(todoActions.deleteTodo(todo.id));
                    alert("đã xóa");
                } catch (err) {
                    console.log("Lỗi khi xóa công việc", err);
                }
            },
            onCancel() {
            },
        });
    }
    return (
        <div>
            <div>

                <h3>Task List</h3>

                <div className='box'>
                    <form onSubmit={(e) => {
                        handleAddTodo(e);
                    }}>
                        <div className='header-box'>
                            <div className='main-box-btn-add'>

                                {editingTask.id === null ?
                                    <input type='text' id='name' name='name' ></input> :
                                    <input type='text' id='name' name='name' value={editingTask.name} onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}></input>}
                            </div>
                            <div>
                                {/* {editingTask.id == null ?
                                    <button type='submit' >add task</button> :
                                    <button onClick={(e) => handleUpdate(e, editingTask.id)} >Save
                                    </button>} */}
                                    <button type='submit' >add task</button> 
                            </div>
                        </div>
                        <div>
                            <h3>Task</h3>
                        </div>
                    </form>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todotStore.data?.map((todo, index) => {
                                        return (
                                            <tr key={todo.id}>
                                                {/* <td>{todo.name}</td> */}
                                                <td>
                                                    <button onClick={() => handleDeleteDo(todo)}>Delete</button>
                                                    {/* <button onClick={() => setEditingTask({ id: todo.id, name: todo.name })} > Edit </button> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
