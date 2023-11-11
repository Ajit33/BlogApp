import { Service } from 'appwrite/types/service';
import config from '../conf/config';

import { Client,Databases,Storage,Query,ID} from 'appwrite'




export class Service{
   client=new Client();
   databases;
   bucket;

   constructor(){
     this.client
     .setEndpoint(config.appwriteUrl)
     .setProject(config.appwriteProjectId)
     this.databases=new Databases(this.client);
     this.bucket=new Storage(this.client)
   }
   async createPost({titel,slug,content,featuredImage,status,userId}){
   try{
       return await this.databases.createDocument(
        config.appwriteDatabseId,
        config.appwriteCollectiontId,
        slug,
        {
            titel,
            content,
            featuredImage,
            status,
            userId
        }
       )
   }
   catch(error){
  console,log("appwrite service :: createPost :: error",error)
   }  
 }
 async updatePost(slug,{titel,content,featuredImage,status}){
    try{
       return await this.databases.updateDocument(
        config.appwriteDatabseId,
        config.appwriteCollectiontId,
        slug,
        {
            titel,
            content,
            featuredImage,
            status,
        }
       )
    }
    catch(error){
      console.log("Appwrite service :: updatePost :: error",error)
    }

 }
 async deletePost(slug){
    try{
      await this.databases.deleteDocument(
        config.appwriteDatabseId,
        config.appwriteCollectiontId,
        slug
      )
      return true;
    }
    catch(error){
      console.log("Appwrite service :: deletePost :: error",error);
      return false;
    }
 }
 async getpost(slug){
    try{
        return await this.databases.getDocument(
            config.appwriteDatabseId,
            config.appwriteCollectiontId,
            slug
        )
    }
    catch(error){
      console.log("Appwrite service :: getpost :: error",error)
      return false;
    }
 }
 async getPosts(queries=[Query.equal("status","active")]){
    try{
       return await this.databases.listDocuments(
        config.appwriteDatabseId,
        config.appwriteCollectiontId,
        queries,
        

       )
    }
    catch(error){
        console.log("Appwrite service ::getposts :: erroe ",error);
        return false;
    }
 }

 //files upload service start from here.
  async uploadFile(file){
    try{
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    }
    catch(error){
       console.log("Appwrite service :: uploadfile :: error",error) ;
       return false;
    }
  }
  async deleteFile(fileID){
    try{
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileID
        )
        return true;

    }
    catch(error){
        console.log("Appwrite service :: deletefile :: error",error);
        return false ;
    }
  }
   getFilePreview(fileID){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileID
    )
   }
}
const service=new Service()

export default service