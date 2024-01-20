import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

function AddTask() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  //success toast
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left"
    })
  }

  //warning toast
  const handleWarning = (warning) => {
    toast.warning(warning, {
      position: "bottom-left"
    })
  }

  //error toast
  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left"
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/tasks/add",
        {
          title,
          dueDate,
          isCompleted: false
        },
        { withCredentials: true }
      );

      console.log(data)

      const { warning, message, success } = data;

      if (success) {
        handleSuccess(message);

        setTitle("");
        setDueDate("");
      } else {
        warning ? handleWarning(message) : handleError(message);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form className="flex items-center gap-8 w-[60%] text-lg" onSubmit={handleSubmit}>
        <div className='relative flex-1'>
          <input
            className="w-full py-2 px-4 border-primary border-4 rounded-lg text-primary placeholder-secondary"
            name="title" type="text" placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className='absolute top-1/2 -translate-y-1/2 right-6 flex items-center gap-2'>
            <DatePicker
              className="text-primary placeholder-secondary w-24 focus:-m-2 outline-none cursor-pointer"
              selected={dueDate}
              placeholderText="Due Date"
              onChange={(date) => setDueDate(date)}
            />
            <FontAwesomeIcon className="text-secondary cursor-pointer" icon={faCalendar} />
          </label>
        </div>
        <div className="relative w-[15%] h-full hover:opacity-[0.8]">
          <FontAwesomeIcon className="absolute top-1/2 left-8 -translate-y-1/2 text-secondary-bg text-3xl cursor-pointer" icon={faPlus} />
          <input className="bg-secondary w-full h-full rounded-lg cursor-pointer" type="submit" value="" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddTask;