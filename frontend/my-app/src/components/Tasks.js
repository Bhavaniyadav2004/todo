import React, { useState } from 'react';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const addTask = () => {
        if (newTask.title && newTask.description && newTask.dueDate) {
            setTasks([...tasks, newTask]);
            setNewTask({ title: '', description: '', dueDate: '' });
        } else {
            alert('Please fill all fields');
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Manage Your Tasks</h2>

            {/* Add Task Form */}
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    placeholder="Task Title" 
                    name="title" 
                    value={newTask.title} 
                    onChange={handleChange} 
                />
                <textarea 
                    className="form-control mb-2" 
                    placeholder="Task Description" 
                    name="description" 
                    value={newTask.description} 
                    onChange={handleChange} 
                />
                <input 
                    type="date" 
                    className="form-control mb-2" 
                    name="dueDate" 
                    value={newTask.dueDate} 
                    onChange={handleChange} 
                />
                <button className="btn btn-primary" onClick={addTask}>Add Task</button>
            </div>

            {/* Task List */}
            <ul className="list-group">
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                            <small>Due: {task.dueDate}</small>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;
