import { Component, Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
const URL = 'myuploadURL';

@Component({
  selector: 'upload',  
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css']
})

export class UploadComponent {

filetoUpload: Array<File>;
response: {};

constructor() {
  this.filetoUpload = [];
}

upload() {
        this.makeFileRequest(URL, [], this.filetoUpload).then((result) => {           
            this.response = result;            
        }, (error) => {
            console.error(error);
        });
    }
fileChangeEvent(fileInput: any){
        this.filetoUpload = <Array<File>> fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();
            for(let i =0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);                
            }            

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));                        
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

}