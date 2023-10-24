import { useEffect, useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import Input from "./components/Input"
import TaskCard from "./components/TaskCard"
import { taskListMock } from "./siteData/taskList"

export interface Task {
  description?: string
  id: string
  image?: string
  priority: string
  progress: number
  status: string
  title: string
}

const App = () => {
  /* States */
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(taskListMock)
  const [tasksFiltered, setTasksFiltered] = useState<Task[] | undefined>()
  const [taskToEdit, setTaskToEdit] = useState<Task>()
  const [indexTaskToDelete, setIndexTaskToDelete] = useState(0)
  const [search, setSearch] = useState<string>("")

  /* Handlers */
  const saveTaskName = (taskName: string, descriptionTask?: string) => {
    if (taskToEdit) {
      editTask(taskName, descriptionTask || "")
      return
    }
    setTasks([
      ...tasks,
      {
        description: descriptionTask,
        id: (tasks?.length || 1)?.toString(),
        image: "",
        priority: "high",
        progress: 0,
        status: "To Do",
        title: taskName,
      },
    ])
    // TODO salvar no storage
    setShowAddEditModal(false)
  }

  const editTask = (taskName: string, descriptionTask: string) => {
    const updatedTask = {
      ...taskToEdit,
      description: descriptionTask || "",
      title: taskName,
    } as Task
    const updatedItems = tasks.map((item, index) => (item.id == taskToEdit?.id ? updatedTask : item))
    // TODO salvar no storage
    setTasks([...updatedItems])
    setShowAddEditModal(false)
    setTaskToEdit(undefined)
  }

  const deleteTask = () => {
    const updatedListTasks = tasks.filter((_, index) => index !== indexTaskToDelete)
    // TODO salvar no storage
    setTasks(updatedListTasks)
    setShowAddEditModal(false)
    setShowDeleteModal(false)
  }

  const openModalEdit = (taskParam: Task) => {
    setTaskToEdit(taskParam)
    setShowAddEditModal(true)
  }

  const openModalDelete = (indexTask: number) => {
    setIndexTaskToDelete(indexTask)
    setShowDeleteModal(true)
  }

  const clearTempVars = () => {
    setTaskToEdit(undefined)
    setIndexTaskToDelete(0)
  }

  useEffect(() => {
    if (search) {
      let filteredTasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t?.description?.toLowerCase()?.includes(search.toLowerCase())
      )
      setTasksFiltered(filteredTasks)
      return
    }
    setTasksFiltered(undefined)
  }, [search])

  /* Render */
  return (
    <div className="container">
      <div className="top-title">
        <h2>Note IV</h2>
      </div>

      <div className="page-wrapper">
        <div className="task-container">
          {(!tasksFiltered || tasksFiltered?.length == 0) && search.length > 0 && (
            <div className="no-search">
              <h4>Pesquisa sem resultados...</h4>
            </div>
          )}
          {(tasksFiltered ? tasksFiltered : tasks).map((task, index) => (
            <TaskCard
              deleteTask={openModalDelete}
              editTask={openModalEdit}
              indexTask={index}
              key={`task_${index}_${task?.title}`}
              task={task}
            />
          ))}
        </div>
        <div className="info-no-task">{tasks?.length <= 0 && "Você não tem tasks criadas"}</div>
      </div>
      <div className="footer">
        <Input name="search" value={search} placeholder="Search task...." onChange={(e) => setSearch(e.target.value)} />
        <Button
          className="footer-add-button"
          title=""
          icon={<Add />}
          onClick={() => (setShowAddEditModal(true), setSearch(""))}
        />
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          taskToEdit={taskToEdit}
          closeEditModal={() => (setShowAddEditModal(false), clearTempVars())}
          saveTaskHandler={(taskName, descriptionTask) => saveTaskName(taskName, descriptionTask)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal deleteTask={deleteTask} closeModal={() => (setShowDeleteModal(false), clearTempVars())} />
      )}
    </div>
  )
}

export default App
