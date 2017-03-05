import {Injectable} from '@angular/core';
import {PaginationPage, PaginationPropertySort} from './../pagination';
import {webServiceEndpoint} from './../commons';
import {Course} from './../Model/Course';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import * as Rx from "rxjs/Rx";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class CourseService {

private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {

    }

    findCourse(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Course>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/course`, options)
        .map(this.extractData)
        .publish()
        .refCount();
    }




    getCourse(id: number): Rx.Observable<Course> {
        return this.http
        .get(`${webServiceEndpoint}/course/${id}`)
        .map(this.extractData)
        .publish()
        .refCount();
    }

      addCourse (course: Course): Promise<Course> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${webServiceEndpoint}/course`, JSON.stringify(course) , options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  changeCourse (course: Course): Promise<Course> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${webServiceEndpoint}/course`, JSON.stringify(course) , options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

    deleteCourse(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/course/${id}`)
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
