import { BrowserRouter, Route, Routes } from "react-router"
import TodoPage from "./Todo/TodoPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<TodoPage />} />
          <Route path="/" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
