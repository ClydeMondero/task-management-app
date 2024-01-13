import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function CreateTask(){
  return (
    <form className="flex items-center gap-8 w-[60%] text-xl">
      <input className="flex-1 py-4 px-6 border-primary border-4 rounded-lg" name="title" type="text" placeholder="Title" />
      <div className="relative w-[15%] h-full">
        <FontAwesomeIcon className="absolute top-1/2 left-7 -translate-y-1/2 text-secondary-bg text-5xl" icon={faPlus} />
        <input className="bg-secondary w-full h-full rounded-lg" type="submit" value="" />
      </div>
    </form>
  )
}

export default CreateTask;
