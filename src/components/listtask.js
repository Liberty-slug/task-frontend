import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Listtask = () => {

  const [task, setTask] = useState([]);

  const showTasks = async () => {
    try {
      const {
        data: { tasks },
      } = await axios.get("https://task-egrz.onrender.com/api/v1/tasks/");
      setTask(tasks);
    } catch (error) {
      console.log(error);
    }
  };
  showTasks();

  const handleDelete = async (taskID) => {
    try {
      await axios.delete(`https://task-egrz.onrender.com/api/v1/tasks/${taskID}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <p className="loading-text" style={{visibility: task < 1 ? 'visible' : 'hidden' }}>Loading...</p>
      <div className="tasks">
        { task.length === 0 ? 
      <h5 className="empty-list">No tasks in your list</h5>
      :
      task.map((task) => {
        const { completed, _id: taskID, name } = task;
        return (
          <div className={"single-task " + (completed && "task-completed")} key={taskID}>
            <h5>
              <span>
                <i className="far fa-check-circle"></i>
              </span>
              {name}
            </h5>
            <div className="task-links">
              <button
                type="button"
                className="edit-link"
              >
                <Link to={`edittask/${taskID}`}>
                  <i className="fas fa-edit"></i>
                </Link>
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(taskID)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
      
        );
      })
    }
        
      </div>
    </>
  );
};

export default Listtask;
