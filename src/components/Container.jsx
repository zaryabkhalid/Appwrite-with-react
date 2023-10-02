import React from "react";

function Container({ children }) {
	return <div className="max-w-[80%] mx-auto p-4 min-h-screen">{children}</div>;
}

export default Container;
