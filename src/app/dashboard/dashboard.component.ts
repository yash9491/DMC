import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectData } from '../projectdata';
import {MetricsCalculatorService} from '../metrics-calculator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  projectname;
  clientname;
  industrygroup;
  worklocation;
  formdata;
  projectdata : ProjectData[];
  hideModal: boolean = false;
  
  constructor(private _router:Router, private _metricscal: MetricsCalculatorService) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      projectname: new FormControl('', Validators.required),
      clientname: new FormControl(""),
      industrygroup : new FormControl(""),
      worklocation: new FormControl("")
   });
  }
  
  navigatetocalc(){
    this._router.navigateByUrl('/calculator');
  }

  onClickSubmit(data) {
    this.projectdata = [{
      projectname : data.projectname,
      clientname : data.clientname,
      industrygroup : data.industrygroup,
      worklocation : data.worklocation
    }];
    console.log(this.projectdata);
    this._metricscal.postProjectDetails(this.projectdata).subscribe(
      (data: any)=>{console.log("Post Data Success"+data)},
      (error: any)=>{console.log(error)},
      ()=>{}
    );
    document.getElementById("close-modal").click();
    this.navigatetocalc();
  }
}
