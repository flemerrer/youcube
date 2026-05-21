import { Component, signal } from '@angular/core';
import { Navigation } from '../../fragments/navigation/navigation';
import { RouterOutlet } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { Sidenav } from '../../fragments/sidenav/sidenav';

@Component({
  selector: 'app-main',
  imports: [Navigation, RouterOutlet, Sidenav],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
