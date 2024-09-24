import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import TaskManagementPage from "./pages/home.jsx";
import Home from "./components/Home.jsx";
import AddTask from "./components/AddTask.jsx";
import Profile from "./pages/Profile.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<TaskManagementPage />} />
        <Route path="/HomeUser" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App