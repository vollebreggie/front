import {Injectable} from '@angular/core';
import {PaginationPage, PaginationPropertySort} from './../pagination';
import {webServiceEndpoint} from './../commons';
import {User} from './../Model/User';
import {Role} from './../Model/Role';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import * as Rx from "rxjs/Rx";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class UserService {

private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {

    }

    findUsers(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<User>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/user`, options)
        .map(this.extractData)
        .publish()
        .refCount();
    }


   getRoles(): Rx.Observable<String[]> {
        return this.http
        .get(`${webServiceEndpoint}/user/roles`)
        .map(this.extractData)
        .publish()
        .refCount();
    }

     getGenders(): Rx.Observable<String[]> {
        return this.http
        .get(`${webServiceEndpoint}/user/genders`)
        .map(this.extractData)
        .publish()
        .refCount();
    }

    getUser(id: number): Rx.Observable<User> {
        return this.http
        .get(`${webServiceEndpoint}/user/${id}`)
        .map(this.extractData)
        .publish()
        .refCount();
    }

      addUser (User: User): Promise<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${webServiceEndpoint}/user`, JSON.stringify(User) , options)
               .toPromise()
               .catch(this.handleError);
  }

  changeUser (User: User): Promise<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${webServiceEndpoint}/user`, JSON.stringify(User) , options)
               .toPromise()
               .catch(this.handleError);
  }

    deleteUser(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/user/${id}`)
        .publish()
        .refCount();
    }

    addUserWithPhoto(userWithPhoto: FormData) : Rx.Observable<User>{
        
   let  headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
             
        return this.http
                .post( `${webServiceEndpoint}/user/createWithPhoto`, userWithPhoto, options)
                .map(this.extractData)           
    }

        changeUserWithPhoto(userWithPhoto: FormData) : Rx.Observable<User>{
        
   let  headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
             
        return this.http
                .put( `${webServiceEndpoint}/user/updateWithPhoto`, userWithPhoto, options)
                .map(this.extractData)           
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
