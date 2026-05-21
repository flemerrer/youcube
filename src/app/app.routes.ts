import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { PlaylistItem } from './fragments/playlist/playlist';
import { Home } from './fragments/home/home';

export const routes: Routes = [
  { path: '', component: Main, children: [{ path: '', component: Home }]},
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'playlist/:id', component: Main, children: [{ path: '', component: PlaylistItem }]},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

//TODO : split into individual route files if multiple children
// syntax :
// {path: 'admin', loadChildren: () => import('./pages/admin/admin.routes').then(c => c.ADMIN_ROUTES)},
// {path: '', loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard)}
