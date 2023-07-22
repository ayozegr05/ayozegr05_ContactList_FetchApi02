import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";



export const ToDoList = () => {
  const [posts, setPost] = useState([]);
  const host = "https://jsonplaceholder.typicode.com/";
  const [newTask, setNewTask] = useState("");
  const [totalTasks, settotalTasks] = useState(200);

  const fetchPost = async () => {
    const url = host + "todos/";
    const request = {
      method: "GET"
    };

    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();
      setPost(data);
    } else {
      console.log("error: ", response.status, response.statusText);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPost();
    }, 1500);
  }, []);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (newTask) {
      const existingTask = posts.find((task) => task.title === newTask);

      if (!existingTask) {
        const newPost = {
          id: posts.length + 1,
          title: newTask,
          completed: false
        };

        setPost([...posts, newPost]);
        setNewTask("");
        settotalTasks(totalTasks + 1);
      }
    }
  };

  const handleRemoveTask = (taskIdToRemove) => {
    const updatedTasks = posts.filter((post) => post.id !== taskIdToRemove);
    setPost(updatedTasks);
    settotalTasks(totalTasks - 1);
  };

  const toggleComplete = (id) => {
    const updatedTasks = posts.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setPost(updatedTasks);
  };
  const countDoneTask = posts.filter((post) => !post.completed).length;
  

  return (
    <div className="container card mt-4 px-0">
      <div className="bg-primary">
        <h1 className="text-light text-center">ToDos</h1>
        </div>
      <form className="mt-4 " onSubmit={handleFormSubmit}>
        <div className="pepe">
            <input
            className="mb-4 p-2 bg-info white text-center"
            type="text"
            placeholder="Write a new task"
            value={newTask}
            onChange={handleInputChange}
            />
        </div>
          <div className="d-flex justify-content-center text-center">
          
            <ul className="list-group">
              <div className="d-flex">
                <li className="d-flex text-secondary list-group-item white">{countDoneTask} Tasks to do</li>
                <li className="d-flex border-top text-secondary list-group-item white">{totalTasks} Items in the list</li>
              </div> 
              {posts.length === 0 ? (
                <div className="ringcontainer">
                  <ColorRing />
                </div>

              ) : (
                posts.map((post) => (
                  <li className="list-group-item" key={post.id}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <span onClick={() => toggleComplete(post.id)}
                          className={
                            post.completed ? "text-success pe-4 taskText completed" : "text-danger pe-4"
                          }
                        >
                          {post.id}. {post.title}
                        </span>
                      </div>
                      <div>
                      {post.completed ? (
                          <span onClick={() => handleRemoveTask(post.id)}>
                          <i className="fas fa-times text-danger"></i>
                          <i className="fas fa-check text-success ms-2"></i>
                          </span>
                        ) : (
                          <span onClick={() => toggleComplete(post.id)}>
                            <i className="fas fa-ellipsis-h text-danger"></i>
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
      </form>
    </div>
  );
};