import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PhotoService} from '../../Services/photo.service';
import {UserService} from  '../../Services/user.service';
import {Photo} from '../../Model/Photo';
import {User} from '../../Model/User';
import {God} from '../../Model/God';
import {Response} from '@angular/http';
import * as Rx from "rxjs/Rx";

import {showLoading, hideLoading, doNothing} from '../../commons';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent {
@ViewChild('fileInput') inputEl: ElementRef;
photoObservable: Photo;
user: User;

constructor(private photoService: PhotoService, private userService: UserService, private el: ElementRef)
{

}

test: User = {
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
        club: null}


addPhoto()
{
    
  let photo: Photo;
  let formdata = new FormData();
  let inputEl: HTMLInputElement = this.inputEl.nativeElement;

  formdata.append("file", inputEl.files.item(0), inputEl.files.item(0).name);
  formdata.append("data", JSON.stringify(this.test));
   
//let god: God = {form: formdata, user: JSON.stringify(this.test)};

 //let body: any = {formdata: formdata, user: JSON.stringify(this.test)};
  //formdata.append("user", JSON.stringify(this.test));
 //this.photoService.uploadFormDataObservable(formdata).subscribe(response => photo = response);
 //this.photoService.uploadFormDataObservable(formdata).subscribe(response => photo = response);
 //this.photoService.uploadFormDataObservable(this.photoService.ConfigureFormData(this.inputEl)).subscribe(photo => photo = photo);
//console.log(photo);
//this.test.photo = formdata;
//this.photoService.uploadUserObservable(body).subscribe(response => photo =response);
this.photoService.uploadGod(formdata).subscribe();
}



}
