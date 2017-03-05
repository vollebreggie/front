import { Injectable, ElementRef } from '@angular/core';
import { Http, Response ,RequestOptions, Headers } from '@angular/http';
import {webServiceEndpoint} from './../commons';
import {Photo} from './../Model/Photo';
import {User} from './../Model/User';
import {God} from './../Model/God';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as Rx from "rxjs/Rx";

@Injectable()
export class PhotoService {
   
user: User= {
        id: null,
        username: "",
        password: "",
        gender: "Male",
        nickname: "",
        email: "",
        phone: "",
        wechat: "",
        photo: null,
        role: "Member",
        //class: null,
        club: null};


    constructor(private http: Http) {}

    ConfigureFormData(input: ElementRef) : FormData{

        console.log("uploaded");
        let inputEl: HTMLInputElement = input.nativeElement;
       
        let formData = new FormData();
                formData.append("file",  inputEl.files.item(0), inputEl.files.item(0).name);
               
        return formData;
    }

    uploadFormData(formData: FormData) : Promise<Photo>{
        
    let headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
        return this.http
                .post( `${webServiceEndpoint}/image/Photo`, formData, options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError)
    }

    uploadUserPromise(formData: FormData) : Promise<User>{

        let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http
                .post(`${webServiceEndpoint}/image/upload3`, formData)
                .toPromise()
                .catch(this.handleError)
    }

    uploadFormDataObservable(formData: FormData) : Rx.Observable<Photo>{
        
    let headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
       
        return this.http
                .post( `${webServiceEndpoint}/image/Photo`, formData)
                .map(this.extractData)

                
    }

     uploadGod(god: FormData) : Rx.Observable<God>{
        
   let  headers = new Headers();
    headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
       
        return this.http
                .post( `${webServiceEndpoint}/user/withPhoto`, god, options)
                .map(this.extractData)

                
    }

    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }

private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

}