import React from 'react';
import './App.css';
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./layouts/LoginPage";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./layouts/HomePage";
import NewPostPage from "./layouts/NewPostPage";
import RegistrationPage from "./layouts/RegistrationPage";
import {ToastContainer} from "react-toastify";

function App() {

    return (

        <Provider store={store}>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

                    <Route path="/new-post" element={<ProtectedRoute><NewPostPage /></ProtectedRoute>} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
