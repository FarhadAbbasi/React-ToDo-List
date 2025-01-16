// import '../../App.css';
import supabase from "../../config/SupabaseClient";
import { useEffect, useState } from "react";
import TaskCard from './TaskCard';
import ModalAddTask from "../AddTask/ModalAddTask";
import { toast } from "react-toastify";
import Spinner from "./Spinner";


function SupabaseTasks() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    //----------------------------------- Supabase Fetching Starts -------------------------------------->>
    const [supaTaskData, setSupaTaskData] = useState([]);
    const [FetchError, setFetchError] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [action, setAction] = useState ([]);
    const [id, setId] = useState(false);

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


    
    if (isFetching) { return  <div className="h-[500px] w-full flex justify-center "> <Spinner/> </div>  }

    return (

        <div className='bg-white p-3'>
            <button className='m-3 p-2 bg-emerald-500 rounded-md text-white'
                onClick={() => addTask() }> Add new Task </button> <br />

            <ModalAddTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} action='add' />

            <button className='mx-5 my-2 px-3 py-2 bg-indigo-500 text-white w-[800px] rounded-md'> TODO List </button>



            <div>
                <ul>
                    {/*----------------------- Task Table Titles -----------------------------*/}
                    <li className="flex bg-indigo-200 shadow m-3 w-[900px] rounded">
                        <h1 className="py-2 px-5 min-w-40 border"> Name </h1>
                        <p className="py-2 px-5 min-w-[400px] flex wrap border"> Description </p>
                        <p className="py-2 px-5 min-w-40 border"> Date </p>
                        <p className="py-2 px-10 min-w-40"> Action </p>
                    </li>

                    {/*----------------------- Task Table Content -----------------------------*/}
                    {supaTaskData?.map((task) => (
                        <div className="flex bg-indigo-100/40 shadow m-3 w-[900px] rounded">
                            <TaskCard key={task.id} task={task} />
                            <button className="m-2 py-1 px-2 bg-red-500 text-white rounded" onClick={() => handleDelete(task.id)}> Delete </button>
                            <button className='m-2 py-1 px-3 bg-emerald-500 text-white rounded' onClick={() => updateTask(task.id)}> Edit</button>

                        </div>
                    ))}
                </ul>

                <ModalAddTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} action= {action} id={id} />
            </div>
        </div>
    )
}

export default SupabaseTasks;
