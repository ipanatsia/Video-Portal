import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

   videos: any;
   

  constructor(private videoService:VideoService) { }

  ngOnInit(): void {
    this.videos = this.videoService.getVideos().subscribe(
      data=>{
       this.videos = data.videos;
       console.log(this.videos);
     });
  }

  

}
