import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function CreateTask() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <form className="flex items-center gap-8 w-[60%] text-lg">
      <div className='relative flex-1'>
        <input
          className="w-full py-2 px-4 border-primary border-4 rounded-lg text-primary placeholder-secondary"
          name="title" type="text" placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-4'>
          <FontAwesomeIcon className="text-secondary" icon={faCalendar} />
          <DatePicker
            className="text-primary placeholder-secondary w-24 outline-none"
            selected={dueDate}
            placeholderText="Due Date"
            onChange={(date) => setDueDate(date)}
          />
        </label>
      </div>
      <div className="relative w-[15%] h-full">
        <FontAwesomeIcon className="absolute top-1/2 left-9 -translate-y-1/2 text-secondary-bg text-3xl" icon={faPlus} />
        <input className="bg-secondary w-full h-full rounded-lg" type="submit" value="" />
      </div>
    </form>
  )
}

export default CreateTask;
