import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

function RootLayout() {
	return (
		<>
			<Header />
			<main className="min-h-screen">
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
}

export default RootLayout;
