import './Modal.css';
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import supabase from "../../config/SupabaseClient";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';


function ModalAddTask({ isModalOpen, setIsModalOpen, action, id }) {
  // const [addModalOpen, setAddModalOpen] = useState(false);
  // const { id } = useParams();
  const navigate = useNavigate();


  //------------------------ Supabase Insertion Starts ------------------------------->>
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  const handleAdd = () => {
    if (!name || !description || !date) {
      setFormError('Please Fill all details');
      return
    }

    const confirmAdd = async () => {
      const { data, error } = await supabase
        .from('Tasks')
        .insert([
          { name, description, date },
        ])
        .select()

    //     const onAdd= (=> {
    //   set
    // })

      console.log('new added task= ', name, description, date);
      setIsModalOpen(false);
      setFormError(null);
      toast.success(name + " has been added successfully!")
    }
    confirmAdd();
  }
  //------------------------ Supabase Insertion Ends ------------------------------->>

  const closeModal = () => {
    setIsModalOpen(false)
    setFormError(null);
  }


  //------------------------ Supabase Fetch Update Data Starts ------------------------------->>
  useEffect(() => {
    const fetchTaskData = async () => {
      const { data, error } = await supabase
        .from('Tasks')
        .select()
        .eq('id', id)
        .single()

      if (data) {
        setName(data.name);
        setDesc(data.description);
        setDate(data.date);
        console.log(data);
      }
      if (error) {
        navigate('/', { replace: true })
      }


    }
    fetchTaskData();
  }, [id, navigate])

  //--------------------- Supabase Update Data Starts ----------------------->>

  const handleUpdate = () => {
    // e.preventDefault()

    if (!name || !description || !date) {
      setFormError('Please Fill all details');
      return
    }

    const confirmUpdate = async () => {
      const { data, error } = await supabase
        .from('Tasks')
        .update({ name, description, date })
        .eq('id', id)
        .select()

      if (data) {
        setIsModalOpen(false);
        console.log(data);
        setFormError(null);
        navigate('/');
      }
      if (error) {
        console.log(error);
        setFormError('Please Fill in all the fields correctly');
      }
    }

  confirmUpdate();

  }


  //------------------------ Supabase Update Data Ends ------------------------------->>


  return (
    <div>
      <ToastContainer />

      {/* <<----------------  THIS IS ADD TASK MODAL ------------------------->> */}

      <Modal show={isModalOpen} onHide={() => (setIsModalOpen(false))}>
        <Modal.Header>
          <Modal.Title> <h2> Add New Item </h2></Modal.Title>
        </Modal.Header>

        {/* <form> */}
        <Modal.Body>

          <label htmlFor='name'>Task Name </label><br />
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='description'>Description </label><br />
          <textarea type="text"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor='date'>Date </label><br />
          <input type="Number"
            placeholder='YYYYMMDD'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {formError && <p className="error"> {formError} <br /></p>}
        </Modal.Body>
        <Modal.Footer>
          <button className="m-2 py-1 px-3 bg-emerald-500 text-white rounded"
            onClick={() => {
              if (action === 'add') handleAdd()
              if (action === 'update') handleUpdate()
            }} > Confirm  </button>

          <button onClick={closeModal} className="m-2 py-1 px-3 bg-slate-500 text-white rounded" > Close </button>
        </Modal.Footer>
        {/* </form> */}

      </Modal>
      {/* <<----------------   ADD ITEM MODAL ENDS HERE ---------------------->> */}


    </div>
  )
}


export default ModalAddTask;