import { computed, Injectable, Signal, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor() {
    this.retrieveLoggedUser()
  }

  private readonly currentUserSignal = signal<Partial<User> | null>(null);
  public isAuthenticated: Signal<boolean> = computed(() => this.currentUserSignal() !== null);
  public currentUser: Signal<Partial<User>|null> = computed(() => this.currentUserSignal());

  register(newUser: User): boolean {
    if (!this.getUserByUsername(newUser.username)) {
      const users: User[] = this.getAllUsers();
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      return true;
    }
    return false;
  }

  getAllUsers(): User[] {
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      try {
        const users = JSON.parse(localUsers)
        return users ? users : [];
      } catch (error) {
        console.error("Failed to parse users:", error)
      }
    }
    return []
  }

  getUserByUsername(username: string): User | null {
    const user = this.getAllUsers().find((user) => user.username == username);
    return user ? user : null;
  }

  login(user: User): boolean {
    const users = this.getAllUsers();
    const isAuthenticated = users.some(
      (u) => u.username == user.username && u.password == user.password,
    );
    if (isAuthenticated) {
      const connectedUser = {
        username: user.username,
        jwtToken: 'fakeJwtToken',
      };
      sessionStorage.setItem('connectedUser', JSON.stringify(connectedUser));
      this.currentUserSignal.set(connectedUser);
      return true;
    }
    return false;
  }

  retrieveLoggedUser() {
    const currentUser = sessionStorage.getItem('connectedUser');
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser)
        this.currentUserSignal.set(user)
      } catch (error) {
        console.error("Failed to parse connected user:", error)
        sessionStorage.removeItem('connectedUser')
      }
    }
  }

  logout() {
    sessionStorage.removeItem('connectedUser');
    this.currentUserSignal.set(null);
  }
}
