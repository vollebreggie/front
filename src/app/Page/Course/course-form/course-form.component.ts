import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CourseService} from '../../../Services/course.service';
import {Course} from '../../../model/Course';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {


test: Course = {
    id: 1
 }



constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) {

    }

     ngOnInit() {}

 add(): void {
    console.info("reached the add function");
    if (!this.test) { return; }
    this.courseService.addCourse(this.test);
      }
  
change(): void{
    console.info("reached the change function");
    if(!this.test) { return; }
    this.courseService.changeCourse(this.test);
}

    back() {
        history.back();
    }
}
