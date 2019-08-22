import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private ds: DataService,
    public formBuilder: FormBuilder
  ) { }
  records: any = [];
  count: any = 0;
  limit: any = 10;
  page: any = 1;
  childMessage: any;
  edit: Boolean = false;
  myform: FormGroup;
  submitted: Boolean = false;
  formData: any;
  search:any="";
  selectCategoryId:any ="";
  categoryList:any=[];

  getFormFields() {
    if (this.edit) {
      this.selectCategoryId = this.childMessage.category_id._id;
      return {
        _id: [this.childMessage._id],
        category_id: [this.childMessage.category_id._id],
        name: [this.childMessage.name, Validators.required],
      }
    } else {
      return {
        category_id: [""],

        name: ["", Validators.required],
      }
    }
  }

  ngOnInit() {
    this.ds.getAllCategory().subscribe((data: any) => {
      this.categoryList = data.data;
    });
    this.ds.getProduct(this.search,this.limit,this.page).subscribe((data: any) => {
      console.log(data)
      this.records = data.data.product;
      this.count =data.data.totalcount;
      console.log(this.records)
    });
    

    this.myform = this.formBuilder.group(this.getFormFields());
  }
  get f() { return this.myform.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.myform.valid) {
      if (this.edit) {
        let formValue = Object.assign({}, this.myform.value);
        this.formData = formValue
      } else {
        let formValue = Object.assign({}, this.myform.value);
        this.formData = formValue
      }
      this.submitsection();
    }
  }
  pageChanged(event) {
    this.page = event.page;
    this.ngOnInit();
  }
  submitsection() {
    if (this.edit) {
      this.ds.updateProduct(this.childMessage._id, this.formData).subscribe(data => {
        this.submitted = false;
        this.cancel()
        this.ngOnInit();
      })
    } else {
      this.ds.addProduct(this.selectCategoryId,this.formData,).subscribe(data => {
        this.submitted = false
        this.page = 1;
        this.cancel()
        this.ngOnInit();
      });
    }
  }
  onItemChange(value) {
    this.selectCategoryId = value;
    console.log(this.selectCategoryId)
    // this.getProducts()
  }
  editRecord(record){
    this.edit =true;
    this.childMessage =record;
    this.myform = this.formBuilder.group(this.getFormFields());
  }
  DeleteRecord(id){
    this.ds.deleteProduct(id).subscribe(data => {
      this.submitted = false;
      this.cancel()
      this.ngOnInit();
    })
  }
  cancel(){
    this.edit=false;
    this.submitted = false;
    this.myform = this.formBuilder.group(this.getFormFields());
  }
}
