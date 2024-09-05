import { useState } from 'react'
import Navbar from "./components/Navbar";
import Todolist from './components/Todolist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Todolist />
    </div>
  )
}

export default App

