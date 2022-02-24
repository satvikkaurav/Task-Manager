import "./App.css";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { nanoid } from "nanoid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Theme from "./components/color";
import { ThemeProvider } from "@mui/material/styles";
import Task from "./components/Task";
import { useState } from "react";

function App(props) {
  //For date
  const [date, setDate] = React.useState(new Date(""));

  const [tasks, setTasks] = useState(props.taskdata);

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const [task, setTask] = useState({
    title: "",
    desc: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    console.log("Hello");
    addTask(task);
    setTask({
      title:"",
      desc : "",
    })
    setDate(new Date(""))
  };

  function addTask(task) {
    const newTask = {
      id: "todo-" + nanoid(),
      title: task.title,
      desc: task.desc,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    console.log(id);
    const remainingTasks = tasks.filter((t) => id !== t.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((t) => (
    <Task
      id={t.id}
      title={t.title}
      desc={t.desc}
      key={t.id}
      deleteTask={deleteTask}
      complete={t.complete}
    />
  ));

  return (
    <div className="container">
      <div className="card">
        <div className="wrapper">
          <div className="header">
            <h1>Task Manager</h1>
          </div>
            <div className="title">
              <TextField
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
                name="title"
                fullWidth
                value={task.title}
                onChange={handleChange}
              />
            </div>
            <div className="description">
              <TextField
                id="outlined-textarea"
                placeholder="Task Description"
                minRows={4}
                value={task.desc}
                name="desc"
                onChange={handleChange}
                multiline
                fullWidth
              />
            </div>
            <div className="date">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      value={task.date}
                      name="date"
                      onChange={handleChange}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="submitbutton">
              <ThemeProvider theme={Theme}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Create Task
                </Button>
              </ThemeProvider>
            </div>
        </div>
      </div>
      <div className="yourtasks">
        <h1>Your Tasks</h1>
        {taskList}
      </div>
    </div>
  );
}

export default App;
