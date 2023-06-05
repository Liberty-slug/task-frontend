import React from "react";
import { useState } from "react";
import Listtask from "../components/listtask";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const [values, setValues] = useState({
    name: '',
    completed: false,
  });

  const [successmsg, setSuccessmsg] = useState(false)
  
  
  const navigate = useNavigate();

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/tasks/",  values )
      setSuccessmsg(true)
      navigate("/");
      setTimeout(() => {
        setSuccessmsg(false)        
      }, 3000)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="task-form">
        <h4>Task Manager</h4>
        <div className="form-control" >
          <input
            type="text"
            name="name"
            className="task-input"
            placeholder="e.g. I will code soon"
            onChange={e => setValues({...values, name: e.target.value})}
          />
          <button
            type="button"
            className="btn submit-btn"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
        {successmsg === true && <div className="form-alert text-success empty-list">success, task added</div> 
       
          
          }
      </div>
      <section className="tasks-container">
          <Listtask />
      </section>
    </>
  );
}

export default TaskPage;
