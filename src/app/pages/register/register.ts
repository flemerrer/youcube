import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../services/users';
import { Router } from '@angular/router';
import { EmptyNav } from '../../fragments/empty_nav/empty-nav';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, EmptyNav],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register  implements OnInit {
  ngOnInit(): void {
    if (this.userService.currentUser() != null) {this.router.navigate(['/']);}
  }

  //TODO: Duplication between login and register components
  // Find a way to merge them; from paramMap ?

  private readonly router = inject(Router);
  private readonly userService = inject(Users);

  register = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    const user = this.register.value;
    if (user.username && user.password) {
      const registered = this.userService.register({
        username: user.username,
        password: user.password,
      });
      if (registered) {
        this.userService.login({ username: user.username, password: user.password });
        setTimeout(() => this.router.navigate(['/']), 300);
      }
    }
  }
}
