import "./style.scss"

interface InputProps {
  isTextArea?: boolean
  label: string
  name: string
  onChange: (event: any) => void
  placeholder: string
  value: string
}

const Input = ({ label, placeholder, onChange, name, value, isTextArea }: InputProps) => {
  return (
    <div className="input">
      <label htmlFor="">{label}</label>
      {isTextArea ? (
        <textarea placeholder={placeholder} onChange={onChange} name={name} value={value} />
      ) : (
        <input type="text" placeholder={placeholder} onChange={onChange} name={name} value={value} />
      )}
    </div>
  )
}

export default Input
