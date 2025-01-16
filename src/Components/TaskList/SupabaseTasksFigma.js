// import '../../App.css';
import supabase from "../../config/SupabaseClient";
import { useEffect, useState } from "react";
import TaskCard from './TaskCard';
import ModalAddTask from "../AddTask/ModalAddTask";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { BsCalendar2Check, BsCalendar2CheckFill } from "react-icons/bs";
import { MdDelete, MdDeleteForever, MdDeleteOutline, MdEdit, MdSettings } from "react-icons/md";
import { data, Link, Outlet, useNavigate, useParams } from "react-router";


function SupabaseTasksFigma() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    //----------------------------------- Supabase Fetching Starts -------------------------------------->>
    const [supaTaskData, setSupaTaskData] = useState([]);
    const [FetchError, setFetchError] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [action, setAction] = useState([]);
    const [id, setId] = useState(false);
    const navigate = useNavigate();

    console.log(isModalOpen);

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

        <div className='bg-white flex h-full '>


            {/* <button className='m-3 p-2 bg-emerald-500 rounded-md text-white' onClick={() => addTask() }> Add new Task </button> <br /> */}
            {/* <button className='mx-5 my-2 px-3 py-2 bg-indigo-500 text-white w-[800px] rounded-md'> TODO List </button> */}

            <div className="flex w-[250px] h-[100vh]  flex-wrap content-stretch">
                <nav className="mt-10 bg-red-400 rounded-r flex-grow flex-shrink flex-basis-[100%] ">

                    <li className="m-4 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <BsCalendar2Check className="my-1 mx-4 " /> My Tasks </li>

                    <li className="m-4 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <BsCalendar2CheckFill className="my-1 mx-4 " /> Vital Tasks </li>

                    <li className="m-4 p-2 rounded-lg flex font-semibold bg-red-500/20 text-white hover:bg-white hover:text-red-400 shadow">
                        <MdSettings className="my-1 mx-4 " /> Settings </li>
                </nav>
            </div>

            <div className="flex-1 mt-10 flex ">
                <ul className="my-1 mx-4 rounded border">
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
                        <div className="m-3  bg-yellow-100/10 hover:bg-yellow-100/30 shadow rounded border">

                            <li className="mx-4 flex-col justify-stretch" key={task.id} >
                                <Link to={`/${task.id}`}>

                                    <h1 className="p-2 rounded-b-xl bg-red-100/40 font-semibold shadow-sm"> {task?.name} </h1>
                                    <p className="p-2 min-h-12 text-slate-600 flex-wrap"> {task?.description} </p>
                                    <p className="p-2 pt-4 text-red-800 flex justify-between"> {task?.date}
                                        <button className=" p-1 bg-red-500 text-white rounded " onClick={() => handleDelete(task.id)}>  <MdDelete /> </button>
                                    </p>
                                </Link>
                            </li>

                        </div>
                    ))}
                </ul>
            </div>

            <div className="flex-1">
                <Outlet />
                {/* <h1> Outlet </h1> */}
            </div>

            <ModalAddTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} action={action} id={id} />
        </div>
    )
}

export default SupabaseTasksFigma;


// export function TaskDetail() {

//     const { id } = useParams();
//     const task = globalData[id];

//     if (!task) {
//         return <h3> Task :{id} Not Found! </h3>
//     }

//     return (

//         <div>
//             <li className="mx-4 flex-col justify-stretch" key={task.id} >

//                 <h1 className="p-2 rounded-b-xl bg-red-100/40 font-semibold shadow-sm"> {task?.name} </h1>
//                 <p className="p-2 min-h-12 text-slate-600 flex-wrap"> {task?.description} </p>
//                 <p className="p-2 pt-4 text-red-800 flex justify-between"> {task?.date}
//                     <button className=" p-1 bg-red-500 text-white rounded " 
//                     // onClick={() => handleDelete(task.id)}
//                     >  <MdDelete /> </button>
//                 </p>
//             </li>
//         </div>
//     )
// }
