import { Task } from "../../App"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import "./style.scss"

type TaskProps = {
  deleteTask: (indexTask: number) => void
  editTask: (task: Task) => void
  indexTask: number
  task: Task
}

const TaskCard = ({ deleteTask, editTask, indexTask, task }: TaskProps) => {
  const { id, title, priority, status, progress } = task

  return (
    <div key={id + "_" + title} className="task-card">
      <div className="flex w-100">
        <span className="task-title">Titulo</span>
        <span className="task">{title}</span>
      </div>

      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={() => editTask(task)} />
        <DeleteIcon className="cp" onClick={() => deleteTask(indexTask)} />
      </div>
    </div>
  )
}

export default TaskCard
