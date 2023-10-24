import classnames from "classnames"
import { MouseEventHandler, ReactNode } from "react"
import "./style.scss"

type ButtonProps = {
  title: string
  icon?: ReactNode
  outline?: boolean
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const Button = ({ title, icon, outline, disabled, onClick, className }: ButtonProps) => {
  return (
    <button
      className={classnames(className ?? "", outline && "outline", "button")}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      {title}
    </button>
  )
}

export default Button
