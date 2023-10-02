import config from "../config/config";

import { Client, ID, Account } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, username }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				username
			);
			if (userAccount) {
				// Call another method
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			const userLogin = await this.account.createEmailSession(email, password);
			return userLogin;
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwite service:: getCurrentUser:: error: ", error);
		}

		return null;
	}

	async logout() {
		try {
			this.account.deleteSessions();
		} catch (error) {
			console.log("Appwite service:: logout:: error: ", error);
		}
	}
}
const authService = new AuthService();
export default authService;
