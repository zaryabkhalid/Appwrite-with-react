import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { login as authLogin } from "../features/auth/authSlice";
import authService from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Login = () => {
	const [error, setError] = useState("");
	const loginEmailRef = useRef(null);
	const loginPasswordRef = useRef(null);
	const [showPass, setShowPass] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

	const login = async (data) => {
		setError("");
		try {
			const session = await authService.login(data);
			if (session) {
				const userdata = await authService.getCurrentUser();
				if (userdata) {
					dispatch(authLogin(userdata));
				}
				navigate("/", { replace: true });
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className=" max-w-[520px] border border-gray-100 rounded-md flex-auto p-8">
					<div className=" w-full">
						<div className="text-center mb-9">
							<h2 className="text-5xl font-bold mb-4">Login</h2>
							<Link to="/" className="text-sm text-pink-500 leading-relaxed">
								With Appwrite
							</Link>
						</div>
						{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
						<form onSubmit={handleSubmit(login)} className="mt-8">
							{/* Email Input */}
							<Input
								label="Email"
								placeholder="Enter your email"
								name="email"
								ref={loginEmailRef}
								important={true}
								errors={errors}
								register={register}
								rules={{
									required: {
										value: true,
										message: "Email is required",
									},
									pattern: {
										value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
										message: "Email address format is Invalid",
									},
								}}
							/>

							{/* Password Input */}

							<Input
								label="Password"
								type={showPass ? "text" : "password"}
								name="password"
								ref={loginPasswordRef}
								placeholder="Enter your password"
								important={true}
								errors={errors}
								register={register}
								rules={{
									required: {
										value: true,
										message: "Password is required",
									},
								}}
							/>

							{/* Show or Hide Password */}
							<div className="mt-3 flex justify-end">
								<div className="flex space-x-1">
									<input
										type="checkbox"
										id="showPass"
										name="showPass"
										value={showPass}
										errors={errors}
										onChange={() => {
											setShowPass(!showPass);
										}}
									/>
									<label htmlFor="showPass">Show Password</label>
								</div>
							</div>

							{/* Login Button */}
							<div className="flex justify-center items-center  my-6">
								<Button type="submit">Login</Button>
							</div>
						</form>

						<div className="text-center text-sm ">
							<span>Create a new Account</span>
							<Link className="text-pink-500 ml-3" to="/register">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
