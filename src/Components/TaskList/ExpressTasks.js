
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";


function ExpressTasks() {

//----------------------------------- Express Server Fetching Starts -------------------------------------->>
const URL = "http://localhost:3000/data";
const [taskData, setTaskData] = useState([]);
const [isFetching, setFetching] = useState(false);

const getTaskData = async () => {

    try {
        setFetching(true);
        const response = await fetch(URL);
        console.log(response);
        let temp = await response.json();
        console.log("Temp data = ", temp);
        setTaskData(temp);
        console.log("Data data = ", taskData);
        setFetching(false);

    }
    catch (error) {
        console.error("Express Fetch Error: ", error);
    }
}

useEffect(() => (getTaskData), [URL]);

//----------------------------------- Express Server Fetching Ends -------------------------------------->>

if (isFetching) { return <p> Data is Loading ... </p> }


return (
    <div>
        <ul>
            {taskData?.map((task) => (
                <div className="flex bg-emerald-500/20 shadow m-3 w-[900px] rounded">
                    <TaskCard key={task.id} task={task} />
                </div>
            ))}
        </ul>

    </div>
)
}

export default ExpressTasks;