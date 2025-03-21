import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios.get(API_URL).then(res => setTasks(res.data));
    }, []);

    const addTask = async () => {
        if (!title) return toast.error("Title required!");
        const res = await axios.post(API_URL, { title, completed: false });
        setTasks([...tasks, res.data]);
        setTitle("");
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add Task" />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.title} 
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
}

export default App;
