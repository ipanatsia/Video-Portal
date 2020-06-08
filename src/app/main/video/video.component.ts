import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }
  
    @Input() video: any;
    // url:string;
    safeUrl: any;
    rating:any;

  ngOnInit(): void {
   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url.toString());
   this.rating = this.ratingToNum(this.video.ratings);
  }

  ratingToNum(arr:any){
    const result =  arr.reduce((total,cur) => (total+cur))/arr.length;
    return result;
  }

 

}
