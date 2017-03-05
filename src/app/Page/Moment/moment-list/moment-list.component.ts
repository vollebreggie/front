import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../../../pagination';
import {Table} from '../../../table';
import {showLoading, hideLoading, doNothing} from '../../../commons';
import {MomentService} from '../../../Services/moment.service';
import {Moment} from '../../../Model/Moment';


@Component({
    selector: 'app-moment-list',
    templateUrl: './moment-list.component.html',
    styleUrls: ['./moment-list.component.css']
})
export class MomentListComponent implements OnInit, Table<Moment> {

    momentPage: PaginationPage<Moment>;
    self: Table<Moment>;

    constructor(private momentService: MomentService, private router: Router) {

    }

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Moment>> {
        let observable: Rx.Observable<PaginationPage<Moment>> = this.momentService.findMoments(pageNumber, pageSize, sort);
        
        observable.subscribe(momentPage => this.momentPage = momentPage);
        
        return observable;
    }

    goToDetails(moment) {
        this.router.navigate(['moment', moment.id]);
    }

    goToForm() {
        this.router.navigate(['addMoment']);
    }

    delete(moment) {

        let observable: Rx.Observable<Response> = this.momentService.deleteMoment(moment.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 10, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }
}
