import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Initializes a new instance of the AuthService class.
   * Sets up the Appwrite client with endpoint and project configurations,
   * and initializes an Account instance for user authentication.
   */

  /*******  6c567d20-47ee-4cce-99d0-ad2570cfffc3  *******/
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
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
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
