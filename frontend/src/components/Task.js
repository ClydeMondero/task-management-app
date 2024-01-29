import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

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
    const {data} = await axios.delete(
      "http://localhost:4000/tasks/delete",
      {params: { id: props.id }, withCredentials: true},
    )

    const {success, message} = data;

    if(success){
      handleSuccess(message);

      setTimeout(() => {
        props.onDelete();
      }, 3000);
    }else{
      handleError(message);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between bg-primary-bg w-3/4 px-4 py-2 rounded-lg text-xl">
        <div className="flex items-center gap-4">
          <input className="appearance-none p-4 border-primary border-2 rounded-3xl checked:completed-checkbox" type="checkbox" />
          <p className="text-primary font-bold">{props.title}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-base text-secondary">{props.dueDate}</p>
          <FontAwesomeIcon
            className="text-primary cursor-pointer"
            icon={faTrashCan}
            onClick={handleClick}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Task;
