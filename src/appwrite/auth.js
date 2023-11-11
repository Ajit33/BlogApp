import config from '../conf/config';

import { Client,Account,ID} from 'appwrite'


 export class AuthSercvice{
   clinet =new Client();
   account;
   constructor(){
    this.clinet
         .setEndpoint(config.appwriteUrl)
         .setProject(config.appwriteProjectId)
     this.account=new Account(this.clinet)
   }
   async createAccounnt({email,password,name}){
         try{
            const userAccount= await this.account.create(ID.unique,email,password,name)
            if(userAccount){
             //call another method
              return this.login({email,password})
            }
            else{
                return userAccount
            }
         }
         catch(error){
            throw error;
         }
   }
   async login({email,password}){
    try{
         return await this.account.createEmailSession(email.password);
    }
    catch(error){
        throw error
    }
   }
   async getCurrentStatus(){
     try{
        return await this.account.get();

     }
     catch(error){
        console.log("Appwrite service :: getCurrentUser :: error",error)
     }
     return null
   }
 }


const authService=new AuthSercvice();


 export default authService;