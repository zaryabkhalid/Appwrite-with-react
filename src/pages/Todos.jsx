import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Input, Button, TodoCard } from "../components";
import TodoService from "../appwrite/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../features/todos/todoSlice";
import Spinner from "../components/Spinner";

function Todos() {
	const todos = useSelector((state) => state.todoReducer.todos);
	const userId = useSelector((state) => state.authReducer.userData?.$id);

	const dispatch = useDispatch();
	const todoInputRef = useRef(null);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		mode: "onSubmit",
		defaultValues: {
			todo: "",
			isCompleted: false,
			userId: "",
		},
	});

	const createTodo = async (data) => {
		await TodoService.createTodo({
			todo: data.todo,
			isCompleted: data.isCompleted,
			userId: userId,
		});
		reset();
	};

	useEffect(() => {
		TodoService.getAllTodo()
			.then((response) => {
				dispatch(setTodos(response.documents));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		TodoService.getAllTodo()
			.then((response) => {
				dispatch(setTodos(response.documents));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [createTodo, TodoService.deleteTodo]);

	return (
		<Container>
			<section className=" mt-2 flex flex-wrap gap-6 justify-between">
				<div className=" w-full md:flex-1 h-[400px]  p-8">
					<div className=" w-full">
						<div className="text-center mb-9">
							<h2 className="text-5xl font-bold mb-4">Create New Todo</h2>
						</div>

						<form onSubmit={handleSubmit(createTodo)}>
							{/* Todo Input */}
							<Input
								label="New Todo"
								placeholder="Enter your todo"
								name="todo"
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
								<Button type="submit" disabled={!isValid || isSubmitting}>
									{isSubmitting ? <Spinner /> : "Create Todo"}
								</Button>
							</div>
						</form>
					</div>
				</div>

				<div className=" w-full  p-8 md:flex-1 md:border-l border-slate-800">
					<h2 className="text-center text-xl font-bold md:text-5xl">Todos List</h2>
					<div className="mt-10 h-[780px] overflow-y-auto p-4 scroll-smooth">
						{todos?.map((item) => (
							<TodoCard key={item.$id} todoItem={item} />
						))}
					</div>
				</div>
			</section>
		</Container>
	);
}

export default Todos;
