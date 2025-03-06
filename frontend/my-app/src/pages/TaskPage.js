import React, { useEffect, useState } from 'react';
import Tasks from '../components/Tasks';
import { fetchTasks, addTask, deleteTask } from '../api';

const TaskPage = ({ user }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            } catch (err) {
                alert('Failed to fetch tasks');
            }
        };
        loadTasks();
    }, []);

    const handleAddTask = async (task) => {
        try {
            const newTask = await addTask(task);
            setTasks([...tasks, newTask]);
        } catch (err) {
            alert('Failed to add task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(t => t.id !== taskId));
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <Tasks tasks={tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />
        </div>
    );
};

export default TaskPage;
