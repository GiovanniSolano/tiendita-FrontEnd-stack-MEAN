import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [

    {
        path: 'inicio',
        component: PagesComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildPagesRoutingModule)
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }