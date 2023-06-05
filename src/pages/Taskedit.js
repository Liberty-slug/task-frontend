import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'

const Taskedit = () => {
  const [task, setTask] = useState([]);
  const [values, setValues] = useState({
    name: '',
    completed: '',
  });
  // const [taskcomplete, setComplete] = useState(false)

  const location = useLocation()

  const ID = location.pathname.split("/")[2]

  useEffect(()=>{
    const showTasks = async () => {
    try {
      const {
        data: { task },
      } = await axios.get(`https://task-egrz.onrender.com/api/v1/tasks/${ID}`);
      setTask(task);
    } catch (error) {
      console.log(error);
    }
  };
  showTasks();
  }, [ID])

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.patch("https://task-egrz.onrender.com/api/v1/tasks/",  values )
      console.log(values)
      // setSuccessmsg(true)
      // navigate("/");
      // setTimeout(() => {
      //   setSuccessmsg(false)        
      // }, 3000)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <div className="container">
          <div className="single-task-form">
            <h4>Edit Task</h4>
            <div className="form-control">
              <label>Task ID</label>
              <p className="task-edit-id">{task._id}</p>
            </div>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input type="text" value={task.name} onChange={e => setValues({...values, name: e.target.value})} name="name" className="task-edit-name" />
            </div>
            <div className="form-control">
              <label htmlFor="completed">completed</label>
              <input type="checkbox" name="completed" className="task-edit-completed" onChange={e => setValues({...values, name: e.target.task.completed})} checked={task.completed === true} />
            </div>
            <button type="submit" className="block btn task-edit-btn" onClick={handleClick}>
              edit
            </button>
            <div className="form-alert"></div>
          </div>
          <Link to="/" className="btn back-link">
            back to tasks
          </Link>
        </div> 
    </>
  );
};

export default Taskedit;
