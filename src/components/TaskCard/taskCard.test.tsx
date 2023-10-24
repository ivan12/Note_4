import { render, screen, fireEvent } from "@testing-library/react"
import TaskCard from "."
import { Task } from "../../App"

const mockDeleteTask = jest.fn()
const mockEditTask = jest.fn()

type TaskProps = {
  deleteTask: (indexTask: number) => void
  editTask: (task: Task) => void
  indexTask: number
  task: Task
}
const sampleTask: Task = {
  description: "Do something for a better future",
  id: "1",
  priority: "",
  progress: 0,
  status: "false",
  title: "Go to the gym",
}

const setup = ({ deleteTask, editTask, indexTask, task }: TaskProps) => {
  render(<TaskCard deleteTask={mockDeleteTask} editTask={mockEditTask} indexTask={indexTask} task={task} />)
}

describe("TaskCard Component", () => {
  it("renders task details correctly", () => {
    const taskProps = {
      deleteTask: mockDeleteTask,
      editTask: mockEditTask,
      indexTask: 0,
      task: sampleTask,
    } as TaskProps
    setup(taskProps)
    expect(screen.getByText("Go to the gym")).toBeInTheDocument()
  })

  it("calls deleteTask when delete button is clicked", () => {
    const taskProps = {
      deleteTask: mockDeleteTask,
      editTask: mockEditTask,
      indexTask: 0,
      task: sampleTask,
    } as TaskProps
    setup(taskProps)
    const deleteButton = screen.getByTestId("delete")
    fireEvent.click(deleteButton)
    expect(mockDeleteTask).toHaveBeenCalledWith(0)
  })

  it("calls editTask when edit button is clicked", () => {
    const taskProps = {
      deleteTask: mockDeleteTask,
      editTask: mockEditTask,
      indexTask: 0,
      task: sampleTask,
    } as TaskProps
    setup(taskProps)
    const editButton = screen.getByTestId("edit")
    fireEvent.click(editButton)
    expect(mockEditTask).toHaveBeenCalledWith(sampleTask)
  })
})
