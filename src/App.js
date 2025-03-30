import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import AdminLayout from "./pages/AdminLayout";
import {Provider} from "react-redux";
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from "./pages/errors/NotFoundPage";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />  {/* Ana sayfa */}
                    <Route path="dashboard" element={<Dashboard />} />


                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="*" element={<NotFoundPage />}/>
            </Routes>
        </Provider>
    )
        ;
}

export default App;
