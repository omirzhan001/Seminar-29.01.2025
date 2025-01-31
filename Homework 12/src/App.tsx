import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import PostsComponent from './post/index';
import Done from './todo/index';

function App() {
  return (
 
   <>
    <div className="container mx-auto p-4">
      <nav>
        <NavLink to="/" className={"mx-5"}>
        <button type="button" class="btn btn-secondary mt-3 mb-5">Post</button>
       
        </NavLink>
        <NavLink to="/Done">
        <button type="button" class="btn btn-secondary mt-3 mb-5 ">To-do-list</button>
       
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<PostsComponent />} />
        <Route path="/Done" element={<Done />} />
      </Routes>
      </div>
    </> 
  );
}

export default App;