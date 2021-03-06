import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import Readme from "./components/Readme";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:userId' element={<Profile />} />
          <Route
            path='/:userId/:repoName/:defaultBranch'
            element={<Readme />}
          />
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
    </BrowserRouter>
  );
};

export default App;
