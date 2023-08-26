import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

type TDeleteModal = {
  deleteTask: () => void
  closeModal: () => void
}

const DeleteModal = ({ closeModal, deleteTask }: TDeleteModal) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Deseja realmente deletar?</p>
        <div className="delete-modal__actions">
          <Button title="Sim" outline onClick={deleteTask} />
          <Button title="Não" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
