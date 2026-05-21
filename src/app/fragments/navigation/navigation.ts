import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

  private readonly router = inject(Router);
  private readonly usersService = inject(Users)
  isLoggedIn = this.usersService.isAuthenticated;
  currentUser = this.usersService.currentUser;

  logout() {
    this.usersService.logout();
  }
}
