import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users';

@Component({
  selector: 'app-empty-nav',
  imports: [RouterLink],
  templateUrl: './empty-nav.html',
  styleUrl: './empty-nav.css',
})
export class EmptyNav {
}
