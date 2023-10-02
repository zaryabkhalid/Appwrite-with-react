import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Input, Button, TodoCard } from "../components";
import appwriteService from "../appwrite/databaseService";

function Todos() {
	const [todos, setTodos] = useState([]);
	const todoInputRef = useRef(null);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	// Get All Todos

	useEffect(() => {
		appwriteService
			.getAllTodo([])
			.then((todo) => {
				if (todo) {
					setTodos(todo.documents);
				}
			})
			.catch((err) => {
				console.log(err);
				console.log("Error Message:", err.message);
			});
	}, []);

	const CreateTodo = async (data) => {
		console.log(data);
	};

	return (
		<Container>
			<section className=" mt-12 flex flex-wrap gap-6 justify-between">
				<div className=" w-full md:flex-1 border border-gray-100 rounded-md  p-8">
					<div className=" w-full">
						<div className="text-center mb-9">
							<h2 className="text-5xl font-bold mb-4">Create New Todo</h2>
						</div>

						<form onSubmit={handleSubmit(CreateTodo)}>
							{/* Todo Input */}
							<Input
								label="New Todo"
								placeholder="Enter your todo"
								name="email"
								ref={todoInputRef}
								important={true}
								errors={errors}
								register={register}
								rules={{
									required: {
										value: true,
										message: "Todo text is required",
									},
								}}
							/>

							{/* Create New Todo Button */}
							<div className="flex justify-center items-center  my-6">
								<Button type="submit">Create Todo</Button>
							</div>
						</form>
					</div>
				</div>

				<div className=" w-full border border-slate-600 p-8 md:flex-1 min-h-[780px] overflow-x-hidden">
					<h2 className="text-center text-xl font-bold md:text-5xl">Todos List</h2>
					<div className="mt-10">
						{todos.map((todo) => {
							return <TodoCard key={todo.$id} todo={todo} />;
						})}
					</div>
				</div>
			</section>
		</Container>
	);
}

export default Todos;
