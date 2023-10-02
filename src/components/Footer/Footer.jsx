import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<section className="relative overflow-hidden py-10 bg-slate-800 ">
			<div className="relative z-10 mx-auto max-w-7xl px-4">
				<div className="-m-6 flex flex-wrap">
					<div className="w-full p-6 md:w-1/2 lg:w-5/12">
						<div className="flex h-full flex-col justify-between">
							<div className="mb-4 inline-flex items-center">
								{/* <Logo width="100px" /> */}
								<h2 className="text-3xl text-slate-200 font-bold">Appwite Todo</h2>
							</div>
							<div>
								<p className="text-sm text-slate-200">
									&copy; Copyright 2023. All Rights Reserved by DevUI.
								</p>
							</div>
						</div>
					</div>
					<div className="w-full p-6 md:w-1/2 lg:w-2/12">
						<div className="h-full">
							<h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-400">
								Company
							</h3>
							<ul>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Features
									</Link>
								</li>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Pricing
									</Link>
								</li>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Affiliate Program
									</Link>
								</li>
								<li>
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Press Kit
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full p-6 md:w-1/2 lg:w-2/12">
						<div className="h-full">
							<h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-400">
								Support
							</h3>
							<ul>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Account
									</Link>
								</li>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Help
									</Link>
								</li>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Contact Us
									</Link>
								</li>
								<li>
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Customer Support
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full p-6 md:w-1/2 lg:w-3/12">
						<div className="h-full">
							<h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-400">
								Legals
							</h3>
							<ul>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Terms &amp; Conditions
									</Link>
								</li>
								<li className="mb-4">
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										className=" text-base font-medium text-slate-200 hover:text-pink-500"
										to="/"
									>
										Licensing
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
