
import { useEffect, useState } from "react";
import ExpressModal from "./ExpressModal";
import Spinner from "./Spinner";


function ExpressMapping() {
    const [isAddition, setAddition] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    //----------------------------------- Handle Delete Starts -------------------------------------->>
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/api/delete/${id}`, { method: 'DELETE' })
            // .then(response => response.json())
            // .then(data => console.log('deleted data', data))
            .catch(error => console.error('Error deleting:', error));

    }

    //----------------------------------- Handle Delete Ends -------------------------------------->>

    //----------------------------------- Handle Add Starts -------------------------------------->>
    const handleAdd = async (newTask) => {

        const response = await fetch(`http://localhost:3000/api/add`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTask)
        })
            // .then(response => response.json())
            // .then(data => console.log('Added Task', data))
            .catch(error => console.error('Error Adding Task:', error));
    }

    //-----------------------------------() Handle Add Ends ()-------------------------------------->>


    //----------------------------------- Toggle Checked Starts -------------------------------------->>

    const toggleCheck = (id) => {
        // setTasks(tasks.map(task => 
        //   task.id === id ? { ...task, checked: !task.checked } : task
        // ));
        console.log('ID is =', id);
    };
    //-----------------------------------() Toggle Checked Ends ()-------------------------------------->>


    //----------------------------------- Express Server Fetching Starts -------------------------------------->>

    // const URL = "http://localhost:3000/supabase/tasks";
    const URL = "http://localhost:3000/supabase/movies";
    // const URL = "http://localhost:3000/movies";
    const [data, setData] = useState([]);
    const [isFetching, setFetching] = useState(false);

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


    if (isFetching) { return  <div className="h-[500px] w-full flex justify-center "> <Spinner/> </div>  }

    // return  <h1 className="p-3 bg-red-600 rounded text-center text-xl text-white font-bold"> Coming Soon ....  </h1>

    //     return (
    //         <div className="flex-col">

    //             <div className="flex m-2 p-2 shadow bg-blue-200/50 w-[900px]">
    //                 {/* <form action="http://localhost:3000/upload-csv" method="POST" encType="multipart/form-data"> */}

    //                 <form action="http://localhost:3000/upload/supabase" method="POST" encType="multipart/form-data">
    //                     <input type="file" name="file" accept=".csv" />
    //                     <button className="bg-emerald-500"> Send File </button>
    //                 </form>

    //                 <div className="w-[900px] text-right"> <button className="p-2 my-2 mx-10 bg-indigo-500 text-white rounded"
    //                     onClick={() => setIsModalOpen(true)}
    //                 >Add New Task </button> </div>
    //             </div>

    //             <ul className="flex flex-wrap">
    //                 {data?.map((task) => (
    //                     <div className="flex bg-indigo-100/40 shadow m-3 w-[900px] rounded">
    //                         <li className="flex" key={task.id}>
    //                             <h1 className="p-2 min-w-40"> {task?.name} </h1>
    //                             <p className="p-2 min-w-[400px] flex wrap"> {task?.description} </p>
    //                             <p className="p-2 min-w-40"> {task?.date} </p>
    //                         </li>
    //                         <button className="m-2 py-1 px-2 bg-red-500 text-white rounded"
    //                             onClick={() => handleDelete(task.id)}
    //                         > Delete </button>
    //                         <button className='m-2 py-1 px-3 bg-emerald-500 text-white rounded'
    //                         // onClick={() => updateTask(task.id)}
    //                         > Edit</button>
    //                     </div>
    //                 ))}
    //             </ul>

    //             <ExpressModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
    //             // action={action} 
    //             />

    //         </div>
    //     )
    // }

    // export default ExpressMapping;



    return (
        <div>
            <form
                action="http://localhost:3000/upload/supabase/movies" method="POST" encType="multipart/form-data">
                <input type="file" name="file" accept=".csv" />
                <button className="m-2 bg-emerald-500"> Upload Movies File </button>
                <button className="ml-20 bg-emerald-500"> Add a New Movie</button>
            </form>

            <h1 className="p-3 w-[100%] bg-red-600 rounded justify-self-center text-center text-xl text-white font-bold"> Top Netflix Movies</h1>
            <ul className="flex flex-wrap">
                {data?.map((movie) => (

                    // <div className="flex items-stretch max-w-[200px] wrap bg-emerald-300/100 shadow m-4 rounded">
                    //     <li className="rounded " key={movie.show_id}>
                    //         <h1 className="p-2 bg-indigo-500/80 font-bold text-black text-lg"> {movie?.name} </h1>
                    //         <p className="p-2 min-h-60 flex wrap"> {movie?.description} </p>
                    //         <p className="p-2 bg-red-500 font-bold text-white "> {movie?.date} </p>
                    //     </li>
                    // </div>

                    <div className="flex bg-indigo-100/40 shadow m-3 w-[900px] rounded">
                        <li className="flex" key={movie?.id}>
                            {/* <input type="checkbox" checked={movie.checked} onChange={() => toggleCheck(movie.id)} /> */}
                            <h1 className="p-2 bg-blue-900 text-white min-w-40 border"> {movie?.name} </h1>
                            <p className="p-2 min-w-[400px] flex wrap border"> {movie?.description} </p>
                            <p className="p-2 min-w-40 bg-slate-300 text-center border"> {movie?.date} </p>
                        </li>
                    </div>
                ))}
            </ul>

        </div>
    )
}
export default ExpressMapping;
