import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../Services/user.service';
import {MomentService} from '../../../Services/moment.service';
import {Moment} from '../../../Model/Moment';
import {MomentPart} from '../../../Model/MomentPart';
import {Photo} from '../../../Model/Photo';
import {User} from '../../../Model/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ValidationService } from '../../../Services/validation.service';


@Component({
    selector: 'app-moment-form',
    templateUrl: './moment-form.component.html',
    styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @ViewChild('fileInput') inputEl: ElementRef;
  momentForm: FormGroup;
  moment: Moment; 
  currentMomentPart: MomentPart;
  privacies : String[];
  momentParts: MomentPart[];
  editIndex: number;
  edit: boolean;
  file: Blob;
  user: User;


momentFill: Moment = {
    id : null,
    title: "",
    user: null,
    picture: "picture",
    club: null,
    friends: null,
    privacy: "Privacy",
    momentParts: null

}

momentPartFill: MomentPart = {
    id: null,
    part:1,
    text:"Testing.",
    photo: null
}



constructor(private router: Router, private route: ActivatedRoute, private momentService: MomentService, private userService: UserService, private formBuilder: FormBuilder, private element: ElementRef) {


    }  
  
  ngOnInit() {

      
      this.momentParts = [];
      this.momentService.getPrivacies().subscribe(privacies => this.privacies = privacies);
      this.moment = this.momentFill;
      this.currentMomentPart = this.momentPartFill;           
      this.momentForm = this.formBuilder.group({
        title: [this.moment.title, Validators.required],
        privacy: [this.moment.privacy, Validators.required]
      });

     this.route.params.subscribe(params=> {
                if(params['id'] != null)
                {                
                    this.userService.getUser(Number(params['id'])).subscribe(user => this.user = user);
                   
                }else{
                    this.userService.getUser(Number(11)).subscribe(user => this.user = user);
                }
    }); 
  }

  saveMoment({ value, valid }: { value: Moment, valid: boolean }) {
      console.log(this.user);
    let fileList: File[] = [];
    if(valid)
    {
    let formdata: FormData = new FormData();
    let moment: Moment = value;

    for(var i = 0; i < this.momentParts.length; i++){
       
     this.momentParts[i].part = i;
     this.momentParts[i].photo.part = i;
     formdata.append(this.momentParts[i].photo.name, this.momentParts[i].photo.content, this.momentParts[i].photo.name.toString());
     
     this.momentParts[i].photo.content = null;
  }
   formdata.append("file", fileList);
    moment.momentParts = this.momentParts;
    if(this.user != null)
    {
        moment.user = this.user;
    }
    formdata.append("data", JSON.stringify(moment));
    
    this.momentService.addMomentWithPhoto(formdata).subscribe();
    }
     this.router.navigate(['moment']);
  }  


//part stuff
  addMomentPart() {
      console.log(this.user);
      let inputEl: HTMLInputElement = this.inputEl.nativeElement;
      let tempPart: MomentPart = { id: null, part: null, text: null, photo: null};
      let photo: Photo = {id: null, name: inputEl.files.item(0).name, content: inputEl.files.item(0), contentType: inputEl.files.item(0).type, part: null}
      let image = this.element.nativeElement.querySelector('.tempimage');
      
      tempPart.text = this.currentMomentPart.text;
      tempPart.photo = photo;
      
      this.momentParts.push(tempPart);
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
    this.momentParts.splice(this.momentParts.indexOf(part), 1);
  }

  LoadPart(part: MomentPart)
  {   
     this.edit = true;
     this.editIndex = this.momentParts.indexOf(part); 
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

      this.momentParts.splice(this.editIndex, 1, tempPart);
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
    


    back() {
        history.back();
    }
}
