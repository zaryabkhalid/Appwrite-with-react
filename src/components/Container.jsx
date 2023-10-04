import React from "react";

function Container({ children }) {
	return (
		<div className=" w-full md:max-w-[80%] mx-auto p-8 min-h-screen">
			{children}
		</div>
	);
}

export default Container;
