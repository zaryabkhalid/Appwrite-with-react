import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Home, About, Login, Register, Todos } from "./pages";
import RootLayout from "./layout/RootLayout";
import authService from "./appwrite/authService";
import { login, logout } from "./features/auth/authSlice";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return !loading ? <RootLayout /> : null;
}

export default App;
