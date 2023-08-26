import { useState } from "react"
import { Task } from "../../App"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

type AddEditTaskFormProps = {
  closeEditModal: () => void
  saveTaskHandler: (taskName: string, descriptionTask?: string) => void
  taskToEdit?: Task
}

const AddEditTaskForm = ({ closeEditModal, saveTaskHandler, taskToEdit }: AddEditTaskFormProps) => {
  /* States */
  const [nameTask, setNameTask] = useState(taskToEdit?.title || "")
  const [descriptionTask, setDescriptionTask] = useState(taskToEdit?.description || "")

  /* Render */
  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{taskToEdit ? "Atualizar Task" : "Criar nova task"}</span>
            <Close className="cp" onClick={() => closeEditModal()} />
          </div>
          <Input
            label="Título"
            name="title"
            onChange={(e) => setNameTask(e.target.value)}
            placeholder="Digite o título aqui..."
            value={nameTask}
          />
          <br />{" "}
          <Input
            isTextArea={true}
            label="Descrição"
            name="descricao"
            onChange={(e) => setDescriptionTask(e.target.value)}
            placeholder="Digite a descriçã aqui..."
            value={descriptionTask}
          />
          <div className="flx-right mt-50">
            <Button
              title={taskToEdit ? "Atualizar" : "Criar"}
              disabled={
                nameTask?.length <= 0 ||
                (taskToEdit && taskToEdit.title === nameTask && taskToEdit.description === descriptionTask)
              }
              onClick={() => saveTaskHandler(nameTask, descriptionTask)}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
