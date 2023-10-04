import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import Container from "../components/Container";
import Spinner from "../components/Spinner";
import authService from "../appwrite/authService";

const SignUp = () => {
	const usernameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [showPass, setShowPass] = useState(false);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const registerUser = async (data) => {
		setError("");
		try {
			const userdata = await authService.createAccount(data);
			if (userdata) {
				navigate("/login");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Container>
			<section className="flex justify-end mt-8 md:mt-20">
				<div className=" max-w-[620px] border border-gray-100 rounded-md flex-auto p-8">
					<div className="text-center mb-9">
						<h2 className="text-5xl font-bold mb-4">Registeration</h2>
						<Link to="/" className="text-sm text-pink-500 leading-relaxed">
							With Appwrite
						</Link>
					</div>

					{error && <p className="text-red-600 mt-8 text-center">{error}</p>}

					<form onSubmit={handleSubmit(registerUser)} className="mt-8">
						<div className="md:flex gap-2">
							{/* Username Input */}
							<Input
								type="text"
								label="Username"
								name="username"
								ref={usernameRef}
								placeholder="Username"
								important={true}
								errors={errors}
								register={register}
								rules={{
									required: {
										value: true,
										message: "Username is required",
									},
									validate: {
										usernameValidate: (value) =>
											/^([A-Za-z0-9]){3,20}$/.test(value) ||
											"Username must contain min 3 to max 20 characters in length, only allow letters and numbers, no special characters.",
									},
								}}
							/>

							{/* Email Input */}

							<Input
								label="Email"
								name="email"
								ref={emailRef}
								placeholder="Email"
								important={true}
								errors={errors}
								register={register}
								rules={{
									required: { value: true, message: "Email is required" },
									validate: {
										matchPattern: (value) =>
											/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
											"Email address must be a valid address",
									},
								}}
							/>
						</div>

						{/* Password Input */}
						<Input
							type={showPass ? "text" : "password"}
							label="Password"
							name="password"
							ref={passwordRef}
							placeholder="Password"
							important={true}
							errors={errors}
							register={register}
							rules={{
								required: {
									value: true,
									message: "Password is required",
								},
								validate: {
									matchPassword: (value) =>
										/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value) ||
										"Password contain 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character",
								},
							}}
						/>

						{/* Confirm Password */}
						<Input
							type={showPass ? "text" : "password"}
							label="Confirn Password"
							name="confirmPassword"
							ref={confirmPasswordRef}
							placeholder="Confirm Password"
							important={true}
							errors={errors}
							register={register}
							rules={{
								required: {
									value: true,
									message: "Confirm Password is Required",
								},
								validate: {
									matchPasswords: (value) => {
										if (value !== getValues("password")) {
											return "Passwords should Match";
										}
									},
								},
							}}
						/>

						{/* Show or Hide Password */}
						<div className="mt-3 flex justify-end">
							<div className="flex gap-1">
								<input
									type="checkbox"
									id="showPass"
									name="showPass"
									value={showPass}
									onChange={() => {
										setShowPass(!showPass);
									}}
								/>
								<label htmlFor="showPass">Show Password</label>
							</div>
						</div>

						{/* Login Button */}
						<div className="flex justify-center items-center  my-6">
							{isSubmitting ? (
								<Spinner />
							) : (
								<Button disabled={!isValid || isSubmitting}>Register</Button>
							)}
						</div>
					</form>

					<div className="text-center text-sm">
						<span>Already have an Account</span>
						<Link className="text-pink-500 ml-3" to="/login">
							Sign In
						</Link>
					</div>
				</div>
			</section>
		</Container>
	);
};

export default SignUp;
