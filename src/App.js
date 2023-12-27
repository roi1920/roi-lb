import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import UserPage from "./pages/userPage/userPage";
import {
    about,
    contact,
    home,
    login,
    register,
    user,
} from "./components/utils/constants";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import PrivateRoute from "./components/utils/privateRoute";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import "./page.css";
import CustomToast from "./components/customToast/customToast";

function App() {
    return (
        <div>
            <Routes>
                <Route
                    path={home}
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={user}
                    element={
                        <PrivateRoute>
                            <UserPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={about}
                    element={
                        <PrivateRoute>
                            <About />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={contact}
                    element={
                        <PrivateRoute>
                            <Contact />
                        </PrivateRoute>
                    }
                />
                <Route path={register} element={<Register />} />
                <Route path={login} element={<Login />} />
            </Routes>
            <CustomToast />
        </div>
    );
}

export default App;
