import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import {
  HttpClient
} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {


  constructor(public http: HttpClient) {
  }
  addCategory(data): Observable<any> {
    var url = environment.API_ENDPOINT + "category"
    return this.http
      .post<any>(url, data, {
        observe: "response"
      })
      .map(res => {
        // this.successMessage('Supplier details added successfully')
        return res.body.data;
      })
      .do(
        _ => _,
        (err) => {
          // this.errorMessage(err.error.message)
        }
      );
  };
  updateCategory(id, data): Observable<any> {
    var url = environment.API_ENDPOINT + "category/"+id;
    return this.http
      .post<any>(url, data, {
        observe: "response"
      })
      .map(res => {
        // this.successMessage('Supplier details added successfully')
        return res.body.data;
      })
      .do(
        _ => _,
        (err) => {
          // this.errorMessage(err.error.message)
        }
      );
  };
  deleteCategory(id): Observable<any> {
    var url = environment.API_ENDPOINT + "category/"+id;
    return this.http
      .delete<any>(url, {
        observe: "response"
      })
      .map(res => {
        // this.successMessage('Supplier details added successfully')
        return res.body.data;
      })
      .do(
        _ => _,
        (err) => {
          // this.errorMessage(err.error.message)
        }
      );
  };
  getCategory(searchkey, limit, page,) {
    

    //let options = new RequestOptions({ headers: this.headers() });

    var actionUrl = environment.API_ENDPOINT + "category";
    searchkey =searchkey.replace(/&/g,'%26')
    actionUrl += '?searchkey=' + searchkey;
    actionUrl += '&limit=' + limit;
    actionUrl += '&page=' + page;
    return this.http.get(actionUrl)
      .map(res => res);
  };
  getAllCategory(){
    

    //let options = new RequestOptions({ headers: this.headers() });

    var actionUrl = environment.API_ENDPOINT + "allcategory";

    return this.http.get(actionUrl)
      .map(res => res);
  };
  addProduct(categoryId,data): Observable<any> {
    var url = environment.API_ENDPOINT +"category/"+categoryId+"/product"
    return this.http
      .post<any>(url, data, {
        observe: "response"
      })
      .map(res => {
        // this.successMessage('Supplier details added successfully')
        return res.body.data;
      })
      .do(
        _ => _,
        (err) => {
          // this.errorMessage(err.error.message)
        }
      );
  };
  updateProduct(id, data): Observable<any> {
    var url = environment.API_ENDPOINT + "product/"+id;
    return this.http
      .post<any>(url, data, {
        observe: "response"
      })
      .map(res => {
        // this.successMessage('Supplier details added successfully')
        return res.body.data;
      })
      .do(
        _ => _,
        (err) => {
          // this.errorMessage(err.error.message)
        }
      );
  };
  deleteProduct(id): Observable<any> {
    var url = environment.API_ENDPOINT + "product/"+id;
    return this.http
      .delete<any>(url, {
        observe: "response"
      })
      .map(res => {
        // this.successMessage('Supplier details added successfully')
        return res.body.data;
      })
      .do(
        _ => _,
        (err) => {
          // this.errorMessage(err.error.message)
        }
      );
  };
  getProduct(searchkey, limit, page,) {
    

    //let options = new RequestOptions({ headers: this.headers() });

    var actionUrl = environment.API_ENDPOINT + "product";
    searchkey =searchkey.replace(/&/g,'%26')
    actionUrl += '?searchkey=' + searchkey;
    actionUrl += '&limit=' + limit;
    actionUrl += '&page=' + page;
    return this.http.get(actionUrl)
      .map(res => res);
  }
  headers() {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET,PUT, POST,DELETE");
    headers.append("Content-Type", "application/json");
    return headers
  }

}

