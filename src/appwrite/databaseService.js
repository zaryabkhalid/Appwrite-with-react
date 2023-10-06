import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite";

export class DatabaseService {
	client = new Client();
	databases;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	// Create TODO
	async createTodo({ todo, isCompleted, userId }) {
		try {
			return await this.databases.createDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				ID.unique(),
				{
					todo,
					isCompleted,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service:: createTodo::error: ", error);
		}
	}

	// Update TODO
	async updateTodo(todoId, { todo, isCompleted }) {
		try {
			return await this.databases.updateDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				todoId,
				{
					todo,
					isCompleted,
				}
			);
		} catch (error) {
			console.log("Appwrite service:: updateTodo::error: ", error);
		}
	}

	// Delete TODO
	async deleteTodo(todoId) {
		try {
			await this.databases.deleteDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				todoId
			);
			return true;
		} catch (error) {
			console.log("Appwrite service:: deleteTodo::error: ", error);
			return false;
		}
	}

	// Get Single Todo
	async getTodo(todoId) {
		try {
			return await this.databases.getDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				todoId
			);
		} catch (error) {
			console.log("Appwrite service:: getTodo::error: ", error);
		}
	}

	// Get All Todos
	async getAllTodo() {
		try {
			return await this.databases.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId
			);
		} catch (error) {
			console.log("Appwrite service:: getAllTodos::error: ", error);
		}
	}

	// Get only completed todos
	async getCompleteTodos(queries = [Query.equal("isCompleted", true)]) {
		try {
			return await this.databases.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log("Appwrite service:: getAllTodos::error: ", error);
			return false;
		}
	}
}

const dbService = new DatabaseService();

export default dbService;
