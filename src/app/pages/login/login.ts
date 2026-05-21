import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../services/users';
import { Router, RouterLink } from '@angular/router';
import { EmptyNav } from '../../fragments/empty_nav/empty-nav';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, EmptyNav, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  ngOnInit(): void {
    if (this.userService.currentUser != null) {this.router.navigate(['/']);}
  }

  private readonly router = inject(Router);
  private readonly userService = inject(Users);

  login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    const user = this.login.value;
    if (user.username && user.password) {
      const logged = this.userService.login({ username: user.username, password: user.password });
      if (logged) {
        setTimeout(() => this.router.navigate(['/']), 300);
      }
    }
  }
}
