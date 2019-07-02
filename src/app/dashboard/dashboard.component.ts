import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectData } from '../projectdata';
import {MetricsCalculatorService} from '../metrics-calculator.service';
import { ActivatedRoute } from '@angular/router';

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
  uuid;
  mycalculations : any[];
  projectdata : ProjectData[];
  hideModal: boolean = false;
  
  constructor(private _router:Router, private _metricscal: MetricsCalculatorService) { }

  ngOnInit() {
    this._metricscal.getCalculatedProjects().subscribe(
      data => {
        this.mycalculations = data;
        console.log(this.mycalculations);
      },
      err => {
        console.log(err);
      }
    );
    this.formdata = new FormGroup({
      projectname: new FormControl('', Validators.required),
      clientname: new FormControl(""),
      industrygroup : new FormControl(""),
      worklocation: new FormControl("")
   });
  }

  carouselprev(){
    console.log("Prev");
  }

  carouselnext(){
    console.log("Next");
  }
  
  navigatetocalc(){
    this._router.navigateByUrl('/calculator/'+this.uuid);
  }

  editcalculations(i){
    this._router.navigateByUrl('/calculator/'+i.ProjectGUID);
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
      (data: any)=>{
        this.uuid = data;
        console.log("Post Data Success"+data)
      },
      (error: any)=>{console.log(error)},
      ()=>{
        document.getElementById("close-modal").click();
        this.navigatetocalc();
      }
    );
    
  }
}
