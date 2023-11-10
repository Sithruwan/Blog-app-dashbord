import { Injectable } from '@angular/core';
import {addDoc, doc,collection, Firestore ,collectionData, updateDoc, deleteDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {

  constructor(private firestore : Firestore) {
    
   }

  addCategory(data : object){
    const dbInstance = collection(this.firestore,"categories");
    return addDoc(dbInstance,data);
  }

  loadCategory(){
    const dbInstance = collection(this.firestore,'categories');
    return collectionData(dbInstance,{idField:'id'})
  }

  updateCategory(data : object , id : string){
    const docInstance = doc(this.firestore,'categories',id);
    return updateDoc(docInstance,data);
  }

  deleteCategory(id : string){
    const docInstance = doc(this.firestore,'categories',id);
    return deleteDoc(docInstance);
  }

}
