import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../Services/user.service';
import {User} from '../../../model/User';
import {Club} from '../../../model/Club';
import {Role} from '../../../model/Role';
import {Form} from '@angular/forms';

@Component({
    selector: 'app-user-form-2',
    templateUrl: './user-form-2way.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserForm2WayComponent implements OnInit {
  model: User;  
  roles: String[];
  submitted: boolean = false;
  genders: String[];

club: Club = {
    id: 1,
    code: "XIA",
    location: "Xiamen",
    name: "daringduck"
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

constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
         
    }

     ngOnInit() {
     this.model = this.test;
     this.userService.getRoles().subscribe(roles => this.roles = roles);
     this.userService.getGenders().subscribe(genders => this.genders = genders);
    
    }

 onSubmit() {
    if (!this.model) { return; }
   this.userService.addUser(this.model);
   this.router.navigate(['user']);
  }

    back() {
        history.back();
    }
}
