import React from "react";

const Spinner = ({ classname }) => {
	return (
		<span
			className={`inline-block w-8 h-8 border-t-4 rounded-full animate-spin ${classname}`}
		></span>
	);
};

export default Spinner;
