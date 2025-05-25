import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    
    // class members -> sare endpoints me ye cahiye
    client = new Client();
    account;

    // constructor
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);    
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.loginAccount({email, password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            console.log(error);
        }
    }


    async loginAccount({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Error while logging in", error);
        }
        return null
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Error while getting current user", error);
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Error while logging out", error);
        }
        return null
    }





}


const authService = new AuthService()
export default authService
