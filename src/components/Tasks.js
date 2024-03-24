import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Task({ task, markAsDone, deleteTask }) {
  return (
    <div className="task flex justify-between items-center">
      <span>{task.task}</span>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white text-2xl hover:bg-green-500"
          onClick={() => markAsDone(task)}
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <button
          onClick={() => deleteTask(task)}
          className="flex items-center bg-transparent border border-transparent text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/get_task", {
        token: localStorage.getItem("token"),
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/create_task", {
        token: localStorage.getItem("token"),
        task: newTask,
      });
      fetchTasks();
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const markAsDone = async (task) => {
    try {
      await axios.put("http://127.0.0.1:8000/done_task", { task });
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const deleteTask = async (task) => {
    try {
      await axios.delete("http://127.0.0.1:8000/delete_task", {
        data: { token: localStorage.getItem("token"), id: task.id },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-[#1a1a2e] text-white min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-8 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white text-3xl mr-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          <h1 className="text-3xl font-bold border border-white p-2">Tasks</h1>
        </div>
      </div>
      <div className="border border-white p-8">
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                markAsDone={markAsDone}
                deleteTask={deleteTask}
              />
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task..."
            className="mr-2 px-4 py-2 rounded border border-white-300 focus:outline-none focus:border-blue-500 bg-transparent text-white"
          />
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span
              className="px-4 py-2 bg-transparent text-white rounded-md border transition duration-300 ease-in-out"
              onClick={addTask}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2 -mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
