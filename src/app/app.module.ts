import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';

//table pagination
import {TableElementsCountComponent} from './Common/table-elements-count/table-elements-count.component';
import {TablePaginationComponent} from './Common/table-pagination/table-pagination.component';
import {TableSortComponent} from './Common/table-sort/table-sort.component';

//course
import {CourseComponent} from './Page/Course/course-detail/course.component';
import {CourseListComponent} from './Page/Course/course-list/course-list.component';
import {CourseService} from './Services/course.service'
import {CourseFormComponent} from './Page/Course/course-form/course-form.component';

//user
import {UserService} from './Services/user.service'
import {UserForm2WayComponent} from './Page/User/user-form/user-form-2way.component';
import {UserForm1WayComponent} from './Page/User/user-form/user-form-1way.component';
import {UserComponent} from './Page/User/user-detail/user.component';
import {UserListComponent} from './Page/User/user-list/user-list.component';

//moment
import {MomentService} from './Services/moment.service'
import {MomentFormComponent} from './Page/Moment/moment-form/moment-form.component';
import {MomentComponent} from './Page/Moment/moment-detail/moment.component';
import {MomentListComponent} from './Page/Moment/moment-list/moment-list.component';

//image
import {PhotoService} from './Services/photo.service';
import {ImageComponent} from './Page/Image/image.component';

//fileReader
import {InputFileReader} from './Page/Moment/file-reader/file-reader.component';


@NgModule({
    declarations: [
        AppComponent,
        //course
        CourseFormComponent,
        CourseComponent,
        CourseListComponent,
        //user
        UserForm1WayComponent,
        UserForm2WayComponent,
        UserComponent,
        UserListComponent,
        //moment
        MomentFormComponent,
        MomentComponent,
        MomentListComponent,
        //table pagination
        TableElementsCountComponent,
        TablePaginationComponent,
        TableSortComponent,
        //image
        ImageComponent,
        //fileReader
        InputFileReader
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    providers: [CourseService, UserService, MomentService, PhotoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
