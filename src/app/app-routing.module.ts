import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: '', redirectTo:"/login",pathMatch:"full"},
  { path: 'admin', component:AdminTemplateComponent,canActivate:[AuthenticationGuard],
  children:[
    { path: 'list-customers', component:ListCustomersComponent},
    { path: 'add-customers', component:AddCustomersComponent,canActivate:[AuthorizationGuard],data:{role:"ADMIN"}},
  { path: 'notAuthorized', component:NotAuthorizedComponent},
  ]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
