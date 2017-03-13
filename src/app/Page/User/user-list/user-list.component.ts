import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../../../pagination';
import {Table} from '../../../table';
import {showLoading, hideLoading, doNothing} from '../../../commons';
import {UserService} from '../../../Services/user.service';
import {User} from '../../../Model/User';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, Table<User> {

    userPage: PaginationPage<User>;
    self: Table<User>;

    constructor(private userService: UserService, private router: Router) {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
         showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 10, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    
    }

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<User>> {
        let observable: Rx.Observable<PaginationPage<User>> = this.userService.findUsers(pageNumber, pageSize, sort);
        
        observable.subscribe(userPage => this.userPage = userPage);
        
        return observable;
    }

    goToDetails(user) {
        this.router.navigate(['user', user.id]);
    }

    goToMomentsOfUser(user) {
        this.router.navigate(['moment/user', user.id]);
    }

    goToForm() {
        this.router.navigate(['addUser']);
    }

    delete(user) {

        let observable: Rx.Observable<Response> = this.userService.deleteUser(user.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 10, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }
}
