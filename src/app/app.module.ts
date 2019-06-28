import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {PagerServiceService} from './pager-service.service';
import { CalculatorComponent } from './calculator/calculator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';

const appRoutes : Routes=[{
  path:'calculator/:uuid', component: CalculatorComponent
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
    ReactiveFormsModule ,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    PagerServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
