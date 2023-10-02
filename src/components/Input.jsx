import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
	{
		label,
		type = "text",
		important,
		name,
		register,
		rules,
		errors,
		classname = "",
		...props
	},
	ref
) {
	const id = useId();

	return (
		<div className="w-full mb-4 focus-within:text-pink-500">
			{label && (
				<label htmlFor={id} className="block">
					<span
						className={`${
							important && 'after:content-["*"] after:ml-1 after:text-red-500'
						} inline-block mb-2 text-md font-semibold`}
					>
						{label}
					</span>
				</label>
			)}

			<input
				type={type}
				name={name}
				ref={ref}
				className={`w-full p-3 bg-slate-600 rounded-sm text-slate-100 border-none  focus:outline-1 focus: outline-slate-100 
        ${classname}`}
				{...register(name, rules)}
				{...props}
				id={id}
				autoComplete="off"
			/>

			{/* Error */}
			{errors[name] && (
				<p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
			)}
		</div>
	);
});

export default Input;
