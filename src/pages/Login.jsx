import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Container from "../components/Container";
import Spinner from "../components/Spinner";
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
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		mode: "onTouched",
		defaultValues: {
			email: "",
			password: "",
		},
	});

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
		<Container>
			<section className="flex justify-end mt-8 md:mt-20">
				<div className=" max-w-[580px] border border-gray-100 rounded-md flex-auto p-8">
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
							<div className="flex justify-center items-center gap-4  my-6">
								<Button
									classname="flex items-center justify-center gap-5"
									type="submit"
									disabled={!isValid || isSubmitting}
								>
									{isSubmitting && <Spinner className="border-white" />}
									Login
								</Button>
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
		</Container>
	);
};

export default Login;
