import React from "react";
import { format, parseISO } from "date-fns";
import todoService from "../appwrite/databaseService";

function TodoCard({ todoItem }) {
	const parseDate = parseISO(todoItem.$createdAt);
	const createdAt = format(parseDate, "dd-MM-yyyy HH:mm a");

	const deleteTodo = async () => {
		await todoService.deleteTodo(todoItem.$id);
	};

	return (
		<>
			<div
				className={`w-full flex flex-col justify-between gap-5 p-4 bg-slate-600 text-slate-300 bg-opacity-40 mb-3 rounded-md ${
					todoItem.isCompleted
						? "border-2 border-green-500"
						: "border-2 border-red-500"
				}`}
			>
				{/* Todo content Header */}
				<div className="flex justify-between items-center">
					<span
						className={`inline-block rounded-full p-2  shadow-2xl text-slate-200 text-xs ${
							todoItem.isCompleted ? "bg-green-500" : "bg-red-500"
						}`}
					>
						Completed: {todoItem.isCompleted ? "✔" : "❌"}
					</span>

					<span className="inline-block bg-slate-800 shadow text-slate-200 text-xs p-2 rounded-full">
						{createdAt}
					</span>
				</div>

				{/* Todo Content Body*/}
				<div className="flex justify-between items-center">
					<p className="text-white">{todoItem.todo}</p>

					<div className="flex gap-1">
						<button className="inline-block bg-slate-900 p-2 rounded-md hover:bg-slate-950">
							<svg
								fill="#db2777"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
							</svg>
						</button>
						<button
							className="inline-block bg-slate-900 p-2 rounded-md hover:bg-slate-950"
							onClick={deleteTodo}
						>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								fill="#db2777"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default TodoCard;
