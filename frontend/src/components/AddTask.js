import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

const apiUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

axios.defaults.baseURL = apiUrl;

function AddTask({ onAdd }) {
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
        "tasks/add",
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

  const handleClick = () => {
    setTimeout(() => {
      onAdd();
    }, 3000);
  }

  return (
    <>
      <form className="flex flex-col gap-4 w-full text-lg md:flex-row" onSubmit={handleSubmit}>
        <div className='relative w-full'>
          <input
            className="w-full py-2 px-4 rounded-lg bg-secondary-bg text-primary placeholder-secondary focus:outline-primary"
            name="title" type="text" placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className='absolute top-1/2 -translate-y-1/2 right-6 flex items-center gap-2'>
            <DatePicker
              className="text-primary bg-secondary-bg placeholder-secondary text-center w-[125px] rounded-lg focus:-m-2 outline-none cursor-pointer"
              selected={dueDate}
              placeholderText="Due Date"
              onChange={(date) => setDueDate(date)}
            />
            <FontAwesomeIcon className="text-secondary cursor-pointer" icon={faCalendar} />
          </label>
        </div>
        <div className="relative w-full h-full hover:opacity-[0.8] -z-10 md:w-[25%] lg:w-[35%] xl:w-[45%]">
          <FontAwesomeIcon className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-secondary-bg text-3xl cursor-pointer" icon={faPlus} />
          <input className="bg-secondary w-full h-full py-1 rounded-lg cursor-pointer" type="submit" value="" onClick={handleClick} />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddTask;
