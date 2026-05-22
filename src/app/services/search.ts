import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class Search {
  private readonly videos: Video[] = [
    {
      id: 7484,
      name: 'Farting Dog 006',
      url: '',
    },
    {
      id: 7485,
      name: 'Farting Dog 007',
      url: '',
    },
    {
      id: 7486,
      name: 'Farting Dog 008',
      url: '',
    },
    {
      id: 2584,
      name: 'Orange Cats Compilation',
      url: '',
    },
    {
      id: 2585,
      name: 'Tuxedos are built different',
      url: '',
    },
    {
      id: 2586,
      name: 'Cats falling like idiots',
      url: '',
    },
    {
      id: 1367,
      name: 'DA read the Bible 2 - part 1',
      url: '',
    },
    {
      id: 1368,
      name: 'DA read the Bible 2 - part 2',
      url: '',
    },
    {
      id: 1369,
      name: 'DA read the Bible 2 - part 3',
      url: '',
    },
    {
      id: 1370,
      name: 'DA read the Bible 2 - part 4',
      url: '',
    },
    {
      id: 1371,
      name: 'DA read the Bible 2 - part 5',
      url: '',
    },
  ];

  searchVideos(query: string): Observable<Video[]> {
    const results = this.videos.filter((v) =>
      v.name.toLowerCase().includes(query.toLowerCase()));
    return results ? of(results) : of([]);
  }
}
