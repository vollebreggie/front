import {Injectable} from '@angular/core';
import {PaginationPage, PaginationPropertySort} from './../pagination';
import {webServiceEndpoint} from './../commons';
import {Moment} from './../Model/Moment';
import {User} from './../Model/User';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import * as Rx from "rxjs/Rx";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class MomentService {

private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {

    }

    findMoments(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Moment>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/moment`, options)
        .map(this.extractData)
        .publish()
        .refCount();
    }

    findMomentsByUser(page: number, pageSize: number, sort: PaginationPropertySort, id: number): Rx.Observable<PaginationPage<Moment>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
       }
       let headers = new Headers({ 'Content-Type': 'application/json' });
        params.set('user', `${id}`);

        let options = new RequestOptions({
            search: params, headers: headers
        });
        return this.http.get(`${webServiceEndpoint}/moment/ByUser`, options)
        .map(this.extractData)
        .publish()
        .refCount();
    }

 getPrivacies(): Rx.Observable<String[]> {
        return this.http
        .get(`${webServiceEndpoint}/moment/privacy`)
        .map(this.extractData)
        .publish()
        .refCount();
    }


    getMoment(id: number): Rx.Observable<Moment> {
        return this.http
        .get(`${webServiceEndpoint}/moment/${id}`)
        .map(this.extractData)
        .publish()
        .refCount();
    }

      addMoment (moment: Moment): Promise<Moment> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${webServiceEndpoint}/moment`, JSON.stringify(moment) , options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  changeMoment (moment: Moment): Promise<Moment> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${webServiceEndpoint}/moment`, JSON.stringify(moment) , options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

changeMomentWithPhoto(momentWithPhoto: FormData) {
        
   let  headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
             
        return this.http///moment/createWithPhoto
                .post( `${webServiceEndpoint}/moment/requestChangedObject`, momentWithPhoto, options)
                .map(this.extractData)           
    }

 addMomentWithPhoto(momentWithPhoto: FormData) {
        
   let  headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
             
        return this.http///moment/createWithPhoto
                .post( `${webServiceEndpoint}/moment/requestObject`, momentWithPhoto, options)
                .map(this.extractData)           
    }

    deleteMoment(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/moment/${id}`)
        .publish()
        .refCount();
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
