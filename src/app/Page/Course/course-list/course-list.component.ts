import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../../../pagination';
import {Table} from '../../../table';
import {showLoading, hideLoading, doNothing} from '../../../commons';
import {CourseService} from '../../../Services/course.service';
import {Course} from '../../../Model/Course';


@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, Table<Course> {

    coursePage: PaginationPage<Course>;
    self: Table<Course>;

    constructor(private courseService: CourseService, private router: Router) {

    }

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        //this.self = this; not sure why this is here?
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Course>> {
        let observable: Rx.Observable<PaginationPage<Course>> = this.courseService.findCourse(pageNumber, pageSize, sort);
        console.log(observable);
        observable.subscribe(coursePage => this.coursePage = coursePage);
        console.log(observable.subscribe(coursePage => this.coursePage = coursePage));
        return observable;
    }

    goToDetails(course) {
        this.router.navigate(['course', course.id]);
    }

    goToForm() {
        this.router.navigate(['addCourse']);
    }

    delete(course) {

        let observable: Rx.Observable<Response> = this.courseService.deleteCourse(course.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 10, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }
}
