import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseListComponent} from './Page/Course/course-list/course-list.component';
import {CourseComponent} from './Page/Course/course-detail/course.component';
import {CourseFormComponent} from './Page/Course/course-form/course-form.component';

import {UserListComponent} from './Page/User/user-list/user-list.component';
import {UserComponent} from './Page/User/user-detail/user.component';
import {UserForm1WayComponent} from './Page/User/user-form/user-form-1way.component';
import {UserForm2WayComponent} from './Page/User/user-form/user-form-2way.component';

import {MomentListComponent} from './Page/Moment/moment-list/moment-list.component';
import {MomentComponent} from './Page/Moment/moment-detail/moment.component';
import {MomentFormComponent} from './Page/Moment/moment-form/moment-form.component';

import {ImageComponent} from './Page/Image/image.component';

const appRoutes: Routes = [
    //course
    {path: 'course', component: CourseListComponent},
    {path: 'course/:id', component: CourseComponent},
    {path: 'course', component: CourseFormComponent},
    //user
    {path: 'user', component: UserListComponent},
    {path: 'user/:id', component: UserComponent},
    {path: 'addUser', component: UserForm1WayComponent},
    {path: 'addUser2', component: UserForm2WayComponent},
    //moment
    {path: 'moment', component: MomentListComponent},
    {path: 'moment/:id', component: MomentComponent},
    {path: 'addMoment', component: MomentFormComponent},
    //image
    {path: 'image', component: ImageComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
