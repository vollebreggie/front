import {Component, OnInit, ElementRef, Input, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {Form} from '@angular/forms';
import {UserService} from '../../../Services/user.service';
import {Role} from '../../../Model/Role';
import {User} from '../../../Model/User';
import {showLoading, hideLoading, doNothing} from '../../../commons'

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    
    @ViewChild('fileInput') inputEl: ElementRef;
    user: User;
    roles: String[];
    genders: String[];

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private element: ElementRef) {

    }

    ngOnInit() {
        this.route.params.subscribe(params=> {

            this.userService.getUser(Number(params['id'])).subscribe(user => this.user = user);
        });
        this.userService.getRoles().subscribe(roles => this.roles = roles);
        this.userService.getGenders().subscribe(genders => this.genders = genders);
        
    }


 changeListener($event) : void {

    let blob: Blob = $event.target; 
    this.user.photo.content = blob;
  }
    
  changeListner($event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = function(e) {
            var src = reader.result;
            image.src = src;
            image.width = 200;
            image.height = 200;
        };

        reader.readAsDataURL($event.target.files[0]);
    }

    onSubmit() {
    if (!this.user) { return; }
    let formdata = new FormData();

          let inputEl: HTMLInputElement = this.inputEl.nativeElement;
          let user: User = this.user;
          user.photo = null;
          console.log("picture" + inputEl.files.item(0).name);
          if(inputEl.files.item(0) != null)
          {
          formdata.append("file", inputEl.files.item(0), inputEl.files.item(0).name);
          formdata.append("data", JSON.stringify(user));
         console.log("requested");
       this.userService.changeUserWithPhoto(formdata).subscribe();
       this.router.navigate(['user']);
  }
    }

    delete(user) {
        let observable: Rx.Observable<Response> = this.userService.deleteUser(user.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=> {
            this.router.navigate(['user']);
            hideLoading();
        });
    }

    back() {
        history.back();
    }
}
