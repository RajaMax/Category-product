import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DataService } from './service/data.service';
import { AppRoutingModule } from './/app-routing.module';
import { ProductComponent } from './product/product.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),

  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports: [
    PaginationModule
  ]
})
export class AppModule { }
