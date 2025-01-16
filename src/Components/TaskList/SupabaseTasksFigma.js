// import '../../App.css';
import supabase from "../../config/SupabaseClient";
import { useEffect, useState } from "react";
import TaskCard from './TaskCard';
import ModalAddTask from "../AddTask/ModalAddTask";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { BsCalendar2Check, BsCalendar2CheckFill } from "react-icons/bs";
import { MdAdd, MdCheck, MdCheckBox, MdCheckBoxOutlineBlank, MdDelete, MdDeleteForever, MdDeleteOutline, MdEdit, MdHelp, MdLowPriority, MdPriorityHigh, MdSettings } from "react-icons/md";
import { data, Link, Outlet, useNavigate, useParams } from "react-router";


function SupabaseTasksFigma() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [isUpload, setUpload] = useState(false);
    const [taskDetails, setTaskDetials] = useState(null);


    //----------------------------------- Supabase Fetching Starts -------------------------------------->>
    const [supaTaskData, setSupaTaskData] = useState([]);
    const [FetchError, setFetchError] = useState(false);
    const [action, setAction] = useState([]);
    const [id, setId] = useState(false);
    const navigate = useNavigate();

    // console.log(isModalOpen);

    const FetchTaskData = async () => {

        console.log(isModalOpen);
        try {
            setFetching(true);
            const { data, error } = await supabase
                .from('Tasks')
                .select('*')


            if (data) {
                console.log("Supa Fetch data = ", data);
                setSupaTaskData(data);
                setFetching(false);
                setFetchError(null);
            }
            if (error) {
                setFetchError('could not fetch SupaTaskData');
                setSupaTaskData(null);
                console.log('Supabase Fetch Error:', error)
            }
        }
        catch (err) {
            console.error("Unexpected Fetch Error:", err);
            setFetchError('Unexpected error occurred');
            setSupaTaskData(null);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => { if (!isModalOpen) FetchTaskData(); }, [isModalOpen]);
    //----------------------------------- Supabase Fetching Ends -------------------------------------->>

    //----------------------------------- Express Server Fetching Starts -------------------------------------->>

    const URL = "http://localhost:3000/supabase/tasks";
    // const URL = "http://localhost:3000/supabase/movies";
    // const URL = "http://localhost:3000/movies";
    const [data, setData] = useState([]);

    const getData = async () => {

        try {
            setFetching(true);
            const response = await fetch(URL);
            console.log(response);
            let temp = await response.json();
            console.log("Temp data = ", temp);
            setData(temp);
            console.log("Data data = ", data);
            setFetching(false);

        }
        catch (error) {
            console.error("Express Fetch Error: ", error);
            setFetching(false);
        }
    }

    useEffect(() => (getData), [URL]);

    //----------------------------------- Express Server Fetching Ends -------------------------------------->>



    //----------------- Handle Delete ------------------->>
    const handleDelete = async (id) => { // Delete from Supa DataBase
        const { data, error } = await supabase
            .from('Tasks')
            .delete()
            .eq('id', id)
            .select()

        toast.warn("Task has been Deleted!");
        const onDelete = (id) => { // Update local TaskList State for UI rerendering.
            setSupaTaskData(prevData => {
                return prevData.filter((taskrow) => (taskrow.id !== id))
            })
        }

        if (data) {
            console.log('delete data', data);
            onDelete(id); // To Update local TaskList State.
            setTaskDetials(null);
        }
        if (error) {
            console.log(error)
        }
    }
    //--------------- Handle Delete Ends ------------------->>

    const addTask = () => {
        setAction('add');
        setIsModalOpen(true);
    }

    const updateTask = (id) => {
        setId(id);
        setAction('update');
        setIsModalOpen(true);
    }



    if (isFetching) { return <div className="h-[500px] w-full flex justify-center "> <Spinner /> </div> }

    return (

        <div className='bg-white h-full flex '>


            <div className="flex w-[250px] h-[90vh]  flex-wrap content-stretch">
                <nav className="mt-10 bg-red-400 rounded-r flex-grow flex-shrink flex-basis-[100%] ">

                    <div className="flex">
                        <button className='m-5 p-2 bg-red-400 text-white font-bold flex rounded-lg shadow-lg border border-red-100  hover:bg-white hover:text-red-400 justify-self-end' 
                        onClick={() => setUpload(!isUpload)}> <MdAdd className="mx-1 text-2xl" /> List </button>
                        <button className='m-5 p-2 bg-red-400 text-white font-bold flex rounded-lg shadow-lg border border-red-100  hover:bg-white hover:text-red-400 justify-self-end' 
                        onClick={() => addTask()}> <MdAdd className="mx-1 text-2xl" />  Task </button>
                    </div>

                    {isUpload && 
                    <form className="bg-red-500/40 rounded"
                        action="http://localhost:3000/upload/supabase/tasks" method="POST" encType="multipart/form-data">
                        <input type="file" name="file" accept=".csv" />
                        <label> Upload only .csv file</label>
                        <button className= 'm-5 p-2 bg-red-400 text-white font-bold flex rounded-lg shadow-lg border border-red-100  hover:bg-white hover:text-red-400 justify-self-end'> Upload List </button>
                    </form>
                    }


                    <li className="m-6 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <BsCalendar2Check className="my-1 mx-4 " /> My Tasks </li>

                    <li className="m-6 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <BsCalendar2CheckFill className="my-1 mx-4 " /> Vital Tasks </li>

                    <li className="m-6 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <MdSettings className="my-1 mx-4 " /> Settings </li>

                    <li className="m-6 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <MdHelp className="my-1 mx-4 " /> Help </li>
                </nav>
            </div>





            <div className="flex mt-10 w-[500px] h-[90vh] ">
                <ul className="my-1 mx-4 rounded border overflow-auto">
                    <h1 className="mb-4 px-8 font-semibold"> My Tasks </h1>
                    {/* ----------------------- Task Table Titles -----------------------------

                    <li className="flex bg-indigo-200 shadow m-3  rounded">
                        <h1 className="py-2 px-5 min-w-40 border"> Name </h1>
                        <p className="py-2 px-5 min-w-[400px] flex wrap border"> Description </p>
                        <p className="py-2 px-5 min-w-40 border"> Date </p>
                        <p className="py-2 px-10 min-w-40"> Action </p>
                    </li>

                    ----------------------- Task Table Content ----------------------------- */}

                    {supaTaskData?.map((task) => (
                        <div className="m-3 hover:bg-yellow-100/20 shadow rounded border">

                            <li className="mx-4 flex flex-col justify-stretch" key={task.id} onClick={() => setTaskDetials(task)} >
                                {/* <Link to={`/${task.id}`}> */}

                                <h1 className="p-2 rounded-br-xl bg-red-100/20 font-semibold shadow-sm"> {task?.name} </h1>
                                <p className="p-2 min-h-12 max-h-14 text-slate-600 flex-wrap overflow-auto"> {task?.description} </p>
                                <p className="p-2 pt-4 text-red-800 flex justify-between"> {task?.date}
                                    <button className=" p-1 bg-red-500 text-white rounded " onClick={() => handleDelete(task.id)}>  <MdDelete /> </button>
                                </p>

                                {/* </Link> */}
                            </li>

                        </div>
                    ))}
                </ul>
            </div>






            <div className="flex-1 mt-10 w-full h-[90vh] ">
                <h1 className="m-2 p-2 bg-red-400 rounded-sm text-white font-bold"> Task Details </h1>

                <div className="m-4 max-h-40 flex justify-between">

                    <div className="flex-col">
                        <h1 className="p-2 font-semibold text-red-600 text-xl shadow-sm"> {taskDetails?.name} </h1>
                        {taskDetails && <h1 className="py-2 font-light flex"> <MdLowPriority className="mx-5 my-1" /> Priority:   <p className="mx-2 font-semibold">High</p>  </h1>}
                        {taskDetails && <h1 className="py-2 font-light flex"> <MdCheckBoxOutlineBlank className="mx-5 my-1" /> Status:  <p className="mx-2 font-semibold">  Incomplete </p>  </h1>}
                        <h1 className="p-2 font-semibold text-lg text-red-600 flex">  {taskDetails?.date} </h1>
                    </div>


                    <img className="h-40" src="https://cdni.iconscout.com/illustration/premium/thumb/task-completion-illustration-download-in-svg-png-gif-file-formats--complete-tasks-list-checklist-business-miscellaneous-pack-illustrations-5230173.png?f=webp" />
                </div>


                <p className="p-4 pr-40 min-h-40 text-slate-600 flex-wrap"> {taskDetails?.description} </p>

                {taskDetails && <div className="flex justify-end">
                    <button className="m-2 p-2 bg-red-500 text-white rounded " onClick={() => handleDelete(taskDetails.id)}>  <MdDelete /> </button>
                    <button className='m-2 p-2 bg-red-500 text-white rounded' onClick={() => updateTask(taskDetails.id)}> <MdEdit /></button>
                </div>}


            </div>

            <ModalAddTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} action={action} id={id} />
        </div>
    )
}

export default SupabaseTasksFigma;


