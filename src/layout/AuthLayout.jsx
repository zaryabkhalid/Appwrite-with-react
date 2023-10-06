import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
	const [loader, setLoader] = useState(true);
	const navigate = useNavigate();

	const authStatus = useSelector((state) => state.authReducer.status);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}
		setLoader(false);
	}, [authStatus, navigate, authentication]);

	return loader ? (
		<div className="flex justify-center items-center h-screen">
			<div className=" m-auto animate-ping w-16 h-16 border border-pink-500 bg-pink-300"></div>
		</div>
	) : (
		<>{children}</>
	);
}

export default Protected;
