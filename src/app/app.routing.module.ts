import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent, UserEditComponent } from './user-list/index';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard]
        // children: [
        //     { path: 'edit', component: UserEditComponent }
        // ]
    },
    { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const RoutesComponents = [UserListComponent, UserEditComponent];