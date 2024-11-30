import { crateBrowserRouter } from "react-router-dom"
import App from "../App"

const router = crateBrowserRouter([
   {
       path: '/',
       element: <App />
   }
])

export default router