import {Component, OnInit, ElementRef, Input, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../Services/user.service';
import {User} from '../../../model/User';
import {Photo} from '../../../model/Photo';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-form-1',
    templateUrl: './user-form-1way.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserForm1WayComponent implements OnInit {
@ViewChild('fileInput') inputEl: ElementRef;
roles: String[];
genders: String[];
userForm: FormGroup;



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
        club: null};

constructor(private router: Router, 
            private route: ActivatedRoute,
            private userService: UserService,
            private formBuilder: FormBuilder) {
       
    }

ngOnInit()
{
     this.userService.getRoles().subscribe(roles => this.roles = roles);
     this.userService.getGenders().subscribe(genders => this.genders = genders);
   
   this.userForm = this.formBuilder.group({
        username: [this.user.username, Validators.required],
        password: [this.user.password, Validators.required],
        role: [this.user.role],
        gender: [this.user.gender],
        nickname: [this.user.nickname],
        email: [this.user.email],
        wechat: [this.user.wechat],
        phone: [this.user.phone]
      });
}

 saveUser({ value, valid }: { value: User, valid: boolean }) {
    if(valid)
    {    
          let formdata = new FormData();
          let inputEl: HTMLInputElement = this.inputEl.nativeElement;
          let user: User = value;
          
          console.log("picture" + inputEl.files.item(0).name);
          if(inputEl.files.item(0) != null)
          {
          formdata.append("file", inputEl.files.item(0), inputEl.files.item(0).name);
          formdata.append("data", JSON.stringify(user));
         console.log("requested");
       this.userService.addUserWithPhoto(formdata).subscribe();
          }

       this.router.navigate(['user']);
    }
    
  }

  back() {
        history.back();
    }

}