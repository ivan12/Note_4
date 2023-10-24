import { render, screen } from "@testing-library/react"
import App from "./App"

test("Rodando APP...", () => {
  render(<App />)
  const linkElement = screen.getByText("Note IV")
  expect(linkElement).toBeInTheDocument()
})
