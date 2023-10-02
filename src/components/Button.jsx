import React from "react";

const Button = function Button({
	children,
	type = "button",
	bgColor = " bg-pink-500",
	textColor = "text-slate-100",
	classname = "",
	...props
}) {
	return (
		<button
			className={`px-4 py-2 rounded-md min-w-[180px] hover:bg-pink-600 ${bgColor} ${textColor} ${classname}`}
			{...props}
		>
			{children}
		</button>
	);
};
export default Button;
