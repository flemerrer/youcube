import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Playlists } from '../../services/playlist';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlist',
  imports: [RouterLink],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
})
export class PlaylistFragment {
  private readonly playlistsService = inject(Playlists);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  playlist: WritableSignal<Playlist> = signal({ id: 0, name: 'Playlist not found', videos: [] });
  playlistId!: number;

  constructor() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id == null) {
        this.router.navigate(['/']);
        return;
      }

      this.playlistId = +id;
      const playlistFromStorage = this.playlistsService.getPlaylist(this.playlistId);

      if (playlistFromStorage) {
        this.playlist.set(playlistFromStorage);
      }
    });
  }
}
