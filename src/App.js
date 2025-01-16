// import logo from './logo.svg';
import './App.css';
import AddTask from './Components/AddTask/AddTask';
import ModalAddTask from './Components/AddTask/ModalAddTask';
import Header from './Components/Header';
import ExpressMapping from './Components/TaskList/ExpressMapping';
import ExpressMappingFigma from './Components/TaskList/ExpressMappingFigma';
import SupabaseTasks from './Components/TaskList/SupabaseTasks';
import SupabaseTasksFigma from './Components/TaskList/SupabaseTasksFigma';
import TaskCard from './Components/TaskList/TaskCard';
import TaskList from './Components/TaskList/TaskList';
import { GlobalProvider } from './Context/GlobalState';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router';

function App() {
  const { id } = useParams();
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            {/* <Route index element={<TaskList />} />        */}
            <Route index element={<SupabaseTasksFigma />} />
            <Route path=':id' element={<TaskCard />} />
            <Route path='/addtask' element={<AddTask />} />
            <Route path='/supa/express' element={<ExpressMapping />} />

            {/* <Route path='/supa/express/figma' element={<SupabaseTasksFigma />}> */}
          </Route>
        </Routes>

      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
