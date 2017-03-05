import {Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {MomentService} from '../../../Services/moment.service';
import {Moment} from '../../../Model/Moment';
import {Photo} from '../../../model/Photo';
import {MomentPart} from '../../../model/MomentPart';
//import {PersonDTO} from '../../../Model/PersonDTO';
import {showLoading, hideLoading, doNothing} from '../../../commons'

import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-moment',
    templateUrl: './moment.component.html',
    styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

    @ViewChild('fileInput') inputEl: ElementRef;
    momentForm: FormGroup;
    moment: Moment;
    privacies : String[];
    currentMomentPart: MomentPart;
    momentParts: MomentPart[];
    editIndex: number;
    edit: boolean; 

momentPartFill: MomentPart = {
    id: null,
    part:1,
    text:"Testing.",
    photo: null
}

    constructor(private router: Router, private route: ActivatedRoute, private momentService: MomentService, private formBuilder: FormBuilder, private element: ElementRef) {
         
    }

    ngOnInit() {
        this.momentService.getPrivacies().subscribe(privacies => this.privacies = privacies);
        this.route.params.subscribe(params=> {
            this.momentService.getMoment(Number(params['id'])).subscribe(moment => this.moment = moment);
        });
     this.currentMomentPart = this.momentPartFill;
     
    }

editMoment() {
    
    let formdata: FormData = new FormData();
 

    for(var i = 0; i < this.moment.momentParts.length; i++){
       
     this.moment.momentParts[i].part = i;
     this.moment.momentParts[i].photo.part = i;
     formdata.append(this.moment.momentParts[i].photo.name, this.moment.momentParts[i].photo.content, this.moment.momentParts[i].photo.name.toString());
     this.moment.momentParts[i].photo.content = null;
  }
  
    formdata.append("data", JSON.stringify(this.moment));
    this.momentService.changeMomentWithPhoto(formdata).subscribe();
    
     this.router.navigate(['moment']);
  } 

 addMomentPart() {
     
      let inputEl: HTMLInputElement = this.inputEl.nativeElement;
      let tempPart: MomentPart = { id: null, part: null, text: null, photo: null};
      let photo: Photo = {id: null, name: inputEl.files.item(0).name, content: inputEl.files.item(0), contentType: inputEl.files.item(0).type, part: null}
      let image = this.element.nativeElement.querySelector('.tempimage');
      
      tempPart.text = this.currentMomentPart.text;
      tempPart.photo = photo;
      
      this.moment.momentParts.push(tempPart);
      
      this.currentMomentPart.text = "";
      image.src = "";
      this.inputEl.nativeElement.value = '';
  }   

  addPartToList(momentPart: MomentPart)
  { 
    let tempPart: MomentPart = momentPart;
    this.momentParts.push(tempPart);
    
  }

  deletePart(part: MomentPart) {
    this.moment.momentParts.splice(this.moment.momentParts.indexOf(part), 1);
  }

  LoadPart(part: MomentPart)
  {   
     this.edit = true;
     this.editIndex = this.moment.momentParts.indexOf(part); 
     this.currentMomentPart.text = part.text;
     this.currentMomentPart.photo = part.photo;

    
      this.loadPhoto(this.currentMomentPart.photo.content);
      this.inputEl.nativeElement.value = '';
      
  }

  EditPart()
  {
      this.edit = false;
      let inputEl: HTMLInputElement = this.inputEl.nativeElement;
      let tempPart: MomentPart = { id: null, part: null, text: null, photo: null};
      let image = this.element.nativeElement.querySelector('.tempimage');
      if(inputEl.files.item(0) != null)
      {
          
         let photo: Photo = {id: null, name: inputEl.files.item(0).name, content: inputEl.files.item(0), contentType: inputEl.files.item(0).type, part: null}
         tempPart.photo = photo;
      }else{
          tempPart.photo = this.currentMomentPart.photo;
      }
      

      tempPart.text = this.currentMomentPart.text;
      

      this.currentMomentPart.text = "";
      this.currentMomentPart.photo = null;
      image.src = "";
      this.inputEl.nativeElement.value = '';

      this.moment.momentParts.splice(this.editIndex, 1, tempPart);
  }

//picturestuff
  changeListner($event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.tempimage');

        reader.onload = function(e) {
            var src = reader.result;
            image.src = src;
            image.width = 200;
            image.height = 200;
        };

        reader.readAsDataURL($event.target.files[0]);
    }

    convertFromResponse(photo: Photo): File
    {
       
    return new File([photo.content],"file", {type: photo.contentType.toString()});
    }

loadPhoto(file: Blob) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.tempimage');

        reader.onload = function(e) {
            var src = reader.result;
            image.src = src;
            image.width = 200;
            image.height = 200;
        };

        reader.readAsDataURL(file);
    }

    delete(moment) {
        let observable: Rx.Observable<Response> = this.momentService.deleteMoment(moment.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=> {
            this.router.navigate(['moment']);
            hideLoading();
        });
    }


    back() {
        history.back();
    }
}
