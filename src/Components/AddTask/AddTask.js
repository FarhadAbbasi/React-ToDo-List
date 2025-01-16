// import '../App.css';
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import { HiOutliePlus, HiOutlineArchive } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify';

function AddTask() {

  const [taskName, setTaskName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const { addTODO } = useContext(GlobalContext);
  const notify = () => toast.success("Your Task has been Added!");

  //---------------  Handle Adding new Task to the List ----------->>
  const handlesubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: Math.floor(Math.random() * 100000000),
      name: taskName,
      description: description,
      date: date
    }
    console.log(newTask);
    addTODO(newTask);
    notify();
  }
  console.log(taskName);
  //---------------  Handle Add Ends  ----------->>


  return (
    <div style={{ backgroundColor: "#aec", color: "black", padding: "10px" }} >
      <ToastContainer/>
      <form
        onSubmit={handlesubmit}
        style={{width: "100%"}}
      >
       <h1> ADD A NEW TASK </h1> <br />

        <label htmlFor='name'>Task Name </label>
        <input type="text"
          onChange={(e) => setTaskName(e.target.value)}
        /> <br />

        <label htmlFor='name'>Description </label>
        <textarea type="text"
          onChange={(e) => setDescription(e.target.value)}
        /><br />

        <label htmlFor='name'>Date </label>
        <input type="Number"
          onChange={(e) => setDate(e.target.value)}
        />

        <button 
        onClick={() => handlesubmit}
        style={{backgroundColor: "#33a", color: '#fff', padding: "10px", borderRadius:'5px'}}
        > Submit </button>
      </form>


    </div>
  );
}

export default AddTask;
