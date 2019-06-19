import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {PagerServiceService} from './pager-service.service';
import { CalculatorComponent } from './calculator/calculator.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes : Routes=[{
  path:'calculator', component: CalculatorComponent
},
{
  path:'', component:DashboardComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PagerServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
