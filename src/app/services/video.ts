import { Injectable } from '@angular/core';
import videos from '../../../public/videos.json';
import { Video } from '../models/video';
const { videos: videosList } = videos;

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly videos: Video[] = videosList;

  getById(id:number): Video|null{
    const result = this.videos.find(v => v.id === id)
    return result ? result : null;
  }

}
