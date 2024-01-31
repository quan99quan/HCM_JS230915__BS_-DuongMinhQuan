import React from 'react'
import RouteIndex from './routes/RouteIndex'
import './main.scss'
import api from './services/apis'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { todoActions } from './store/slices/todolist.slice'
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    api.todo.findMany()
      .then(res => {
        console.log(res);
        dispatch(todoActions.setData(res.data));
      })
      .catch(err => {
        console.log("Lỗi", err);
      });
  }, []);
  return (
    <div>
      <RouteIndex />
    </div>

  )
}
