import './task.css'
import Theme from '../color';
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from 'react';
const Task=(props)=>{

    const [comp, setComp] = useState(props.complete)

    function toggleTaskCompleted(){
      setComp(!comp)
    }

    return(
        <div className='taskcont'>
            <div className='taskname'>
                {props.title}
            </div>
            <div className='taskbuttons'>
            <ThemeProvider theme={Theme}>
              <Button color="primary" variant="contained" onClick={toggleTaskCompleted}>
                {
                  (comp)?"Completed":"Inomplete"
                }
              </Button>
              <Button color="secondary" variant="contained"
                onClick={()=>props.deleteTask(props.id)}
              >
                Delete
              </Button>
            </ThemeProvider>
            </div>
        </div>
    )
}
export default Task;