import {Component,Input, OnInit, ElementRef, EventEmitter} from '@angular/core';
@Component({
  selector: 'filereader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css'],
  
})

export class InputFileReader implements OnInit{
 @Input() file: File;

  constructor(public elementRef: ElementRef) {
  }
  
  ngOnInit() {
      if(this.file == null)
      {
          console.log("input is null")
          return;
      }
      console.log(this.file);
    var reader = new FileReader();
        var image = this.elementRef.nativeElement.querySelector('.image');
        

        reader.onload = function(e) {
            var src = reader.result;
            image.src = src;
            image.width = 20;
            image.height = 20;
        };

        reader.readAsDataURL(this.file);
        //reader.readAsArrayBuffer(this.file);
        //reader.readAsBinaryString(this.file);
  }
}