import { useNavigate, useParams } from "react-router";



function TaskDetailsFigma() {

    //----------------------------------- Supabase Fetching Starts -------------------------------------->>
    const [taskDetails, setTaskDetails] = useState([]);
    const [FetchError, setFetchError] = useState(false);
    const [id, setId] = useState(false);
    const navigate = useNavigate();

    setId(useParams()) ;

    console.log(isModalOpen);

    const FetchTaskDetails = async () => {

        try {
            setFetching(true);
            const { data, error } = await supabase
                .from('Tasks')
                .select('*')


            if (data) {
                console.log("Supa Fetch Details = ", data);
                setTaskDetails(data);
                setFetchError(null);
            }
            if (error) {
                setFetchError('could not fetch SupaTaskData');
                setTaskDetails(null);
                console.log('TaskDetails Fetch Error:', error)
            }
        }
        catch (err) {
            console.error("Unexpected Task Details Fetch Error:", err);
            setFetchError('Unexpected error occurred');
            setTaskDetails(null);
        }
    };

    useEffect(() => {  FetchTaskDetails(); }, []);
    //----------------------------------- Supabase Fetching Ends -------------------------------------->>



    if (!task) {
        return <h3> Task :{id} Not Found! </h3>
    }

    return (

        <div>
            <li className="mx-4 flex-col justify-stretch" key={taskDetails.id} >

                <h1 className="p-2 rounded-b-xl bg-red-100/40 font-semibold shadow-sm"> {taskDetails?.name} </h1>
                <p className="p-2 min-h-12 text-slate-600 flex-wrap"> {taskDetails?.description} </p>
                <p className="p-2 pt-4 text-red-800 flex justify-between"> {taskDetails?.date}
                    <button className=" p-1 bg-red-500 text-white rounded " 
                    // onClick={() => handleDelete(task.id)}
                    >  <MdDelete /> </button>
                </p>
            </li>
        </div>
    )
}


export default TaskDetailsFigma;
