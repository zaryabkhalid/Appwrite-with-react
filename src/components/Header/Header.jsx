import { NavLink } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { nanoid } from "@reduxjs/toolkit";

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();

	const navItems = [
		{
			id: nanoid(),
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			id: nanoid(),
			name: "About",
			slug: "/about",
			active: true,
		},
		{
			id: nanoid(),
			name: "Todos",
			slug: "/todos",
			active: authStatus,
		},
	];

	return (
		<header className="w-full bg-slate-700">
			<nav className="px-8 py-4 flex justify-between items-center">
				<div>
					<Link to="/" className="text-4xl text-pink-500 font-bold">
						Appwrite/Auth
					</Link>
				</div>

				<ul className="flex justify-center items-center space-x-6 text-lg">
					{navItems.map((item) =>
						item.active ? (
							<li key={item.id} className="hover:text-pink-400">
								<NavLink
									to={item.slug}
									className={({ isActive }) =>
										isActive ? "text-pink-500 font-semibold" : ""
									}
								>
									{item.name}
								</NavLink>
							</li>
						) : null
					)}
				</ul>

				<div>
					{authStatus ? (
						<LogoutBtn />
					) : (
						<div className="flex items-center gap-4">
							<button
								className="inline-block bg-pink-500 text-slate-100 px-4 py-2 rounded min-w-[120px] hover:bg-pink-400"
								onClick={() => navigate("/login")}
							>
								Login
							</button>
							<button
								className="inline-block bg-pink-500 text-slate-100 px-4 py-2 rounded min-w-[120px] hover:bg-pink-400"
								onClick={() => navigate("/register")}
							>
								Sign Up
							</button>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
