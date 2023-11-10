import { Component, OnInit } from '@angular/core';
import {Form} from "@angular/forms";
import {Observable} from "rxjs";
import {BlogDataService} from "../services/blog-data.service";
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  allCategories! : Observable<Array<any>>;
  categoryId!:string;
  formInput!:string;
  formStatus :string ='Add';
 

  constructor(private bds:BlogDataService, private toaster : ToastrService) {
  }

  ngOnInit(): void {
    this.loadCategoryData();
  }

  onSubmit(formData:any) {
    let categoryData : Category = {
      category : formData.value.category,
    }
    console.log(categoryData);
   

    if(this.formStatus==='Edit'){
     
      this.bds.updateCategory(categoryData,this.categoryId).then(res=>{
        this.toaster.success('Catogery updated successfully...!');
        formData.reset();
        this.formStatus='Add';
      }).catch(err=>{
        console.log(err);
        
      }) 
    }else if (this.formStatus==='Add'){
      this.bds.addCategory(categoryData).then((res)=>{
        this.toaster.success('Catogery saved successfully...!');
        formData.reset();
      }).catch(err=>{
        console.log(err);
      })
    }




  }

  loadCategoryData(){
    this.allCategories = this.bds.loadCategory();
    this.allCategories.subscribe(res=>{
      console.log("categories : ",res);
      
    })
    console.log(this.allCategories);
    
  }

  onEdit(category:string , id:string){
    this.formInput=category;
    this.formStatus='Edit';
    this.categoryId=id;
  }
  onDelete( id:string){
    this.categoryId=id;
    this.bds.deleteCategory(id).then(res=>{
      this.toaster.success("Catogery deleted successfully...!");
    }).catch(err=>{
      console.log(err);
      
    })
  }

}
