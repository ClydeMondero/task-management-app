import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Task() {
  return (
    <div className="flex items-center justify-between bg-primary-bg w-3/4 px-4 py-2 rounded-lg text-xl">
      <div className="flex items-center gap-4">
        <input className="appearance-none p-4 border-primary border-2 rounded-3xl checked:completed-checkbox" type="checkbox" />
        <p className="text-primary font-bold">Task</p>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-base text-secondary">Tomorrow</p>
        <FontAwesomeIcon
          className="text-primary cursor-pointer"
          icon={faTrashCan}
        />
      </div>
    </div>
  )
}

export default Task;
