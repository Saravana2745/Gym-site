// filepath: c:\Users\Sarav\OneDrive\Desktop\gym\gym\src\app\app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { MembershipComponent } from './membership/membership.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { WhyComponent } from './why/why.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'classes', component: ClassesComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'contact', component: ContactComponent },
  {path:'whyus',component:WhyComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];
export { routes };
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }