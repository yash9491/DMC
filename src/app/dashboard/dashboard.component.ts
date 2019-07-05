import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ProjectData } from '../projectdata';
import { MetricsCalculatorService } from '../metrics-calculator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  projectname: AbstractControl;
  projectnamepattern = "^[a-z0-9_-]{8,15}$";
  clientname: AbstractControl;
  industrygroup: AbstractControl;
  worklocation: AbstractControl;
  formdata: FormGroup;
  uuid;
  submitted: boolean = false;
  mycalculations: any[];
  editpopupdata : any[];
  projectdata: ProjectData[];
  hideModal: boolean = false;

  constructor(private _formbuilder: FormBuilder, private _router: Router, private _metricscal: MetricsCalculatorService) { }

  ngOnInit() {
    this.getProjectDetails();
    this.formdata = this._formbuilder.group({
      projectname: ['', Validators.required],
      clientname: ['', Validators.required],
      industrygroup: ['', Validators.required],
      worklocation: ['', Validators.required]
    });

    this.projectname = this.formdata.controls['projectname'];
    this.clientname = this.formdata.controls['clientname'];
    this.industrygroup = this.formdata.controls['industrygroup'];
    this.worklocation = this.formdata.controls['worklocation'];
  }

  carouselprev() {
    console.log("Prev");
  }

  get f() { return this.formdata.controls; }

  carouselnext() {
    console.log("Next");
  }

  navigatetocalc() {
    this._router.navigateByUrl('/calculator/' + this.uuid);
  }

  editcalculations(i) {
    this._router.navigateByUrl('/calculator/' + i.ProjectGUID);
  }

  onClickSubmit(data) {
    this.submitted = true;
    console.log(this.submitted);
    if (this.formdata.invalid) {
      return;
    }

    this.projectdata = [{
      projectname: data.projectname,
      clientname: data.clientname,
      industrygroup: data.industrygroup,
      worklocation: data.worklocation
    }];
    console.log(this.projectdata);
    this._metricscal.postProjectDetails(this.projectdata).subscribe(
      (data: any) => {
        this.uuid = data;
      },
      (error: any) => { console.log(error) },
      () => {
        document.getElementById("close-modal").click();
        this.navigatetocalc();
      }
    );

  }

  getProjectDetails(){
    this._metricscal.getCalculatedProjects().subscribe(
      data => {
        this.mycalculations = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteProject(GUID){
    console.log(GUID);
    this._metricscal.deleteProject(GUID).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);this.getProjectDetails();
      },
      () => {
        
      }
    );
  }

  saveEditedProjectDetails(data){
    console.log(data);
  }
}
