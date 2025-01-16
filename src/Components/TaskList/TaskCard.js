

function TaskCard({ task }) {

    return (
        <li className="flex" key={task.id}>
            <h1 className="p-2 min-w-40"> {task?.name} </h1>
            {/* <p className="p-2 min-w-[400px] flex wrap"> {task?.description} </p> */}
            <p className="p-2 min-w-40"> {task?.date} </p>
        </li>
    );
}

export default TaskCard;
