import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  
  

  constructor(private http:HttpClient) { }

  getVideos():Observable<any>{

    return this.http.get<any>("http://localhost:3000/api/videos");

    
  }

  getSingleVideo(id:any):Observable<any>{

   return this.http.post<any>("http://localhost:3000/api/videos/getVideo",{id});
  }

  getVideosID(id:any):Observable<any>{
    return this.http.post<any>("http://localhost:3000/api/videos/getVideoId",{id});
  }

}
