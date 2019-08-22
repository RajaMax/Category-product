import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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

  getFormFields() {
    if (this.edit) {
      return {
        _id: [this.childMessage._id],
        name: [this.childMessage.name, Validators.required],
      }
    } else {
      return {
        name: ["", Validators.required],
      }
    }
  }

  ngOnInit() {
    this.ds.getCategory(this.search,this.limit,this.page).subscribe((data: any) => {
      console.log(data)
      this.records = data.data.category;
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
      this.ds.updateCategory(this.childMessage._id, this.formData).subscribe(data => {
        this.submitted = false;
        this.cancel()
        this.ngOnInit();
      })
    } else {
      this.ds.addCategory(this.formData).subscribe(data => {
        this.submitted = false
        this.page = 1;
        this.cancel()
        this.ngOnInit();
      });
    }
  }
  editRecord(record){
    this.edit =true;
    this.childMessage =record;
    this.myform = this.formBuilder.group(this.getFormFields());
  }
  DeleteRecord(id){
    this.ds.deleteCategory(id).subscribe(data => {
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
