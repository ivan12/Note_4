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
  const { id, title, description, priority, status, progress } = task
  console.log("TASKCARD task >> ", task)
  return (
    <div key={id + "_" + title} className="task-card">
      <div className="flex w-100">
        <span className="task-title">{title}</span>
        {description && <span className="task">{description}</span>}
      </div>

      <div className="actions">
        <EditIcon className="mr-20 cp" data-testid="edit" onClick={() => editTask(task)} />
        <DeleteIcon className="cp" data-testid="delete" onClick={() => deleteTask(indexTask)} />
      </div>
    </div>
  )
}

export default TaskCard
