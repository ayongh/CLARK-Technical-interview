import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',  redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:HomeComponent},
  {path:'task', component:TaskListComponent},
  {path:'categorie', component:CategorieListComponent},
  {path: '**',  redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TaskListComponent, CategorieListComponent,HomeComponent]