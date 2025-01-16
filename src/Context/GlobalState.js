import { createContext, useReducer } from "react"
import Reducer from "./Reducer";

const initialState= {
    todos: [
        { id: 1, name: "CMH Visit", description: "Need to visit friend in Hospital", date: "25 Dec 2024" } ,
        { id: 2, name: "MH Visit", description: "Need to visit friend in Hospital", date: "25 Nov 2024" }
    ]
}

 export const GlobalContext = createContext(initialState) ;

 export const GlobalProvider = ({children})=> {

    const [state, dispatch] = useReducer(Reducer, initialState) ;

    // Add a new TODO 
    const addTODO = (todo)=> {
        dispatch ({
            type: 'ADD-TODO',
            payload: todo
        });
    }
 


    // Delete a previous TODO 
    const deleteTODO = (id)=> {
        dispatch ({
            type: 'DELETE-TODO',
            payload: id
        });
    }


    return (
        <GlobalContext.Provider value={{
            todos: state.todos,
            addTODO,
            deleteTODO
        }} > 
        {children}  
        </GlobalContext.Provider>
    )
 }