import React from "react";
import authService from "../../appwrite/authService";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutHanlder = () => {
		authService
			.logout()
			.then((res) => {
				dispatch(logout());
				navigate("/", { replace: true });
			})
			.catch((error) => {
				console.log(("Error", error));
				throw new Error(error);
			});
	};

	return (
		<button
			className="w-full inline-block bg-slate-600 px-5 py-2 rounded-md"
			onClick={logoutHanlder}
		>
			Logout
		</button>
	);
}

export default LogoutBtn;
