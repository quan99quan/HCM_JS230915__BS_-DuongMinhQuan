import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from '../utils/index';

export default function RouteIndex() {
  return (
    <BrowserRouter>
      <Routes>
   <Route
          path="/task"
          element={lazy.lazyFn(() => import('../user/create/Task'))()}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

