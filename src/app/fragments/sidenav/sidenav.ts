import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { Playlists } from '../../services/playlist';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav implements OnInit {

  private readonly playlistsService = inject(Playlists)

  ngOnInit(): void {
    const playlists: Playlist[] = this.playlistsService.playlistsSignal()
    this.playlists.set(playlists);
  }
  playlists = signal<Playlist[] | null>([]);
}
