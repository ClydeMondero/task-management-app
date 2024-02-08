import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

axios.defaults.baseURL = apiUrl;

function Task(props) {
  //success toast
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left"
    })
  }

  //error toast
  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left"
    })
  }

  const handleClick = async () => {
    const { data } = await axios.delete(
      "tasks/delete",
      { params: { id: props.id }, withCredentials: true },
    )

    const { success, message } = data;

    if (success) {
      handleSuccess(message);

      setTimeout(() => {
        props.onDelete();
      }, 3000);
    } else {
      handleError(message);
    }
  }

  const [isCompleted, setIsCompleted] = useState(props.isCompleted)

  const [styles, setStyles] = useState({
    checkbox: "",
    text: ""
  })

  useEffect(() => {
    if (isCompleted) {
      setStyles({
        checkbox: "completed-checkbox",
        text: "completed-text"
      })
    } else {
      setStyles({
        checkbox: "incomplete-checkbox",
        text: "incomplete-text"
      })
    }
  }, [isCompleted])

  const { checkbox, text } = styles;

  const handleCompletion = async () => {
    await axios.patch(
      "tasks/update",
      { isCompleted: !isCompleted },
      {
        params: {
          id: props.id,
        },
        withCredentials: true
      },
    )

    setIsCompleted(!isCompleted)
  }

  return (
    <>
      <div className="flex items-center justify-between bg-primary-bg w-full px-4 py-2 rounded-lg text-xl md:gap-4">
        <div className="flex flex-1 items-center gap-4">
          <input className={checkbox} type="checkbox" onClick={handleCompletion} />

          <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between">
            <p className={text}>{props.title}</p>
            <p className="text-base text-secondary">{props.dueDate}</p>
          </div>
        </div>

        <FontAwesomeIcon
          className="text-primary cursor-pointer"
          icon={faTrashCan}
          onClick={handleClick}
        />
      </div>
      <ToastContainer />
    </>
  )
}

export default Task;
