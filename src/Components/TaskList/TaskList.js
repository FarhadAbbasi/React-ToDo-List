import '../../index.css';

import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import SupabaseTasks from "./SupabaseTasks";
import ExpressTasks from "./ExpressTasks";
import ModalAddTask from "../AddTask/ModalAddTask";
import ExpressMapping from './ExpressMapping';

function TaskList() {
  const { todos, deleteTODO } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

return (
    <div className='bg-white p-3'>
      <button className='m-3 p-2 bg-emerald-500 rounded-md text-white'
        onClick={()=> setIsModalOpen(true)}> Add new Task </button> <br/>

      <ModalAddTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} action='add'/>

      <button className='mx-5 my-2 px-3 py-2 bg-indigo-500 text-white w-[800px] rounded-md'> TODO List </button>

      {/* <SupabaseTasks /> */}
      {/* <ExpressTasks /> */}
      {/* <ExpressMapping/> */}

    </div>
);
}

export default TaskList;





      {/* <ul 
      style={{ padding: "10px", backgroundColor: "#afc"}}>
        {todos?.map((task) => ( 
          <div style={{display: "flex", margin: "10px"}}>
           <TaskCard key={task.id} task={task} />

            <button style={{ border: "none", backgroundColor: "#f33", color: "white",
            borderRadius: "3px", padding: "5px", cursor: "pointer"  }}
            onClick={() => deleteTODO(task.id)}
            > Delete </button>
         </div>
        ))}
      </ul> */}





          // <li
          // key={task.id} 
          // style={{ listStyleType: "none", display: "flex", margin: "10px" }}>

          //   <h1 style={{ padding: "10px", minWidth: "150px" }}
          //   > 
          //   {task?.name} 
          //   </h1>

          //   <p style={{ padding: "10px", minWidth: "400px", display: "flex", flexWrap: "wrap" }}
          //   > {task?.description} </p>

          //   <p style={{ padding: "10px", minWidth: "150px" }}
          //   > {task?.date} </p>

          //   <button style={{
          //     border: "none", backgroundColor: "#f33", color: "white",
          //     borderRadius: "3px", padding: "5px", cursor: "pointer"
          //   }}
          //   onClick={() => deleteTODO(task.id)}
          //   > Delete </button> <br /><br />
          // </li>
