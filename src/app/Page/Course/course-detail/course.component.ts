import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {CourseService} from '../../../Services/course.service';
import {Course} from '../../../Model/Course';
import {showLoading, hideLoading, doNothing} from '../../../commons'

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

    course: Course;

    constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) {

    }

    ngOnInit() {
        console.log(this.course);
        this.route.params.subscribe(params=> {
            console.log(this.courseService.getCourse(Number(params['id'])));
            console.log(this.courseService.getCourse(Number(params['id'])).subscribe(course => this.course = course));
            this.courseService.getCourse(Number(params['id'])).subscribe(course => this.course = course);
        });
        console.log(this.course);
    }

    delete(course) {
        let observable: Rx.Observable<Response> = this.courseService.deleteCourse(course.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=> {
            this.router.navigate(['course']);
            hideLoading();
        });
    }

    back() {
        history.back();
    }
}
