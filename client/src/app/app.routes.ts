import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: '**', component: NotFoundComponent },
];
