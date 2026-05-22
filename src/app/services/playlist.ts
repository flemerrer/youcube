import { Injectable, signal, WritableSignal } from '@angular/core';
import { Playlist } from '../models/playlist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Playlists {
  private playlists = [
    {
      id: 1,
      name: "Dog videos",
      videos: [
        {
          id: 7484,
          name: "Farting Dog 006",
          url: "",
          description: ""
        },
        {
          id: 7485,
          name: "Farting Dog 007",
          url: "",
          description: ""
        },
        {
          id: 7486,
          name: "Farting Dog 008",
          url: "",
          description: ""
        },
      ]
    },
    {
      id: 2,
      name: "Cat videos",
      videos: [
        {
          id: 2584,
          name: "Orange Cats Compilation",
          url: "",
          description: ""
        },
        {
          id: 2585,
          name: "Tuxedos are built different",
          url: "",
          description: ""
        },
        {
          id: 2586,
          name: "Cats falling like idiots",
          url: "",
          description: ""
        },
      ]
    },
    {
      id: 3,
      name: "David Attenborough Reads the Bible 2 : Superman Returns",
      videos: [
        {
          id: 1367,
          name: "DA read the Bible 2 - part 1",
          url: "",
          description: ""
        },
        {
          id: 1368,
          name: "DA read the Bible 2 - part 2",
          url: "",
          description: ""
        },
        {
          id: 1369,
          name: "DA read the Bible 2 - part 3",
          url: "",
          description: ""
        },
        {
          id: 1370,
          name: "DA read the Bible 2 - part 4",
          url: "",
          description: ""
        },
        {
          id: 1371,
          name: "DA read the Bible 2 - part 5",
          url: "",
          description: ""
        },
      ]
    }
  ]

  public playlistsSignal: WritableSignal<Playlist[]> = signal(this.playlists)

  getPlaylist(id: number) {
    const playlist = this.playlists.find(p => p.id === id)
    return playlist ? playlist : null;
  }
}
