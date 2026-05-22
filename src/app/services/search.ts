import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video } from '../models/video';
import videos from '../../../public/videos.json';
const { videos: videosList } = videos;

@Injectable({
  providedIn: 'root',
})
export class Search {
  private readonly videos: Video[] = videosList;

  searchVideos(query: string): Observable<Video[]> {
    const results = this.videos.filter((v) => v.name.toLowerCase().includes(query.toLowerCase()));
    return results ? of(results) : of([]);
  }
}
