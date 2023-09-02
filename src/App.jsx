import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Form from "./Form"

function App() {
  return (
    <div>
      <ToastContainer
        position='top-center'
        pauseOnFocusLoss={false}
        autoClose={2000}
      />
      <Form />
    </div>
  )
}

export default App
