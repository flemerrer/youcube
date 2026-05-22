import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';
import { Video } from '../../models/video';
import { Search } from '../../services/search';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private readonly router: Router = inject(Router);
  private readonly usersService: Users = inject(Users);
  isLoggedIn = this.usersService.isAuthenticated;
  currentUser: Signal<Partial<User>|null> = this.usersService.currentUser;
  searchControl: FormControl = new FormControl('');
  private searchService: Search = inject(Search);
  error: WritableSignal<string> = signal('')
  searchResults = signal<Video[]>([]);

  ngOnInit() {
    this.setupSearchObservable();
  }

  logout() {
    this.usersService.logout();
  }

  private setupSearchObservable() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(q => q ? q.length > 3  : false),
      //TODO: remove when functional
      tap(() => console.log(`searched for ${this.searchControl.value}`)),
      switchMap(q =>
        this.searchService.searchVideos(q || '').pipe(
          catchError(() => {
            this.error.set('An error happened during search.');
            return of([])
          })
        )),
    ).subscribe({next: results => {
        this.searchResults.set(results)
        const popover = document.getElementById("search-results")
        if (popover) {
          popover.hidden = false;
        }
      }})
  }
}
