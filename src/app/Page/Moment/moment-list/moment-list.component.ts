import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
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
    user?: number;
    constructor(private momentService: MomentService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        
            this.route.params.subscribe(params=> {
                if(params['id'] != null)
                {
                    this.user = Number(params['id']);
                   this.momentService.findMomentsByUser(0, 10, null, Number(params['id'], )).subscribe(momentPage => this.momentPage = momentPage);
                }else{
                   let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
                  showLoading();
                  observable.subscribe(doNothing, hideLoading, hideLoading);
                }
            
        });
      
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

        this.router.navigate(['addMoment', this.user]);
    }

    delete(moment) {

        let observable: Rx.Observable<Response> = this.momentService.deleteMoment(moment.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 10, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }
}
