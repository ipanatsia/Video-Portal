import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  video:any;
  videoId:any;
  videosSide:any=[];
  safeUrl:any;
  
  constructor(private vService: VideoService,private route: ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // get video ID
    this.route.queryParams.subscribe(params=>{
      this.videoId = params.videoId;
    });

    // get video via its ID
    this.vService.getSingleVideo(this.videoId).subscribe(data =>{
      this.video = data.video;
      //get URL of main video in safe mode
      this.safeUrl =this.sanitizer.bypassSecurityTrustResourceUrl(data.video.url.toString());
      //convert video rating array to number
      this.video.ratings = data.video.ratings.reduce((total,cur) => (total+cur))/data.video.ratings.length;
    });

    //get videos of SideBar
    this.vService.getVideosID(this.videoId).subscribe(response=>{
      this.videosSide = response.videos.filter(video=>this.videoId!==video._id);
      this.videosSide.forEach(video=>{
        //bypass security check 
        video.url = this.sanitizer.bypassSecurityTrustResourceUrl(video.url.toString());
        //convert video rating array to number
        video.ratings = video.ratings.reduce((total,cur) => (total+cur))/video.ratings.length;
      });
    });
    
    //get video rating
  }

}
