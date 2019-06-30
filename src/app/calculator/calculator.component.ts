import { Component, OnInit } from '@angular/core';
import { PagerServiceService } from '../pager-service.service';
import { Metrics } from '../Questions';
import { Router } from '@angular/router';
import { MetricsCalculatorService } from '../metrics-calculator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public allItems: any;
  public pager: any = {};
  projectUUID;
  metricvalues: Metrics[];
  pagedItems: Metrics[];
  name: any = "Devops";
  UUID: any[];
  firstindex : number;
  lastindex: number;
  CurrentCategory : any = 'Speed To Market';
  CurrentCategoryNo: number = 1;
  speedtomarket: Metrics[];
  cost:Metrics[];
  quality: Metrics[];
  changerate: Metrics[];
  modifiedvalues: Metrics[];

  constructor(private _pagerservice: PagerServiceService, private metricscalc: MetricsCalculatorService, private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectUUID = this.route.snapshot.paramMap.get('uuid');
    console.log("Calc component: " + this.projectUUID);
    this.metricscalc.getMetricValues(this.projectUUID).subscribe(
      data => {
        this.metricvalues = data;
        console.log(data);
      },
      err => console.log(err),
      () => {
        this.filterMetrics('SpeedToMarket');
        this.speedtomarket = this.metricvalues.filter(x => x.CategoryName == 'SpeedToMarket');
        this.cost = this.metricvalues.filter(x => x.CategoryName == 'Cost');
        this.quality = this.metricvalues.filter(x => x.CategoryName == 'Quality');
        this.changerate = this.metricvalues.filter(x => x.CategoryName == 'ChangeRate');
      }
    );
  }

  filterMetrics(category){
    this.allItems = this.metricvalues.filter(x => x.CategoryName == category);
        this.setPage(1);
  }

  setPage(page: number) {
    this.pager = this._pagerservice.getPager(this.allItems.length, page);
    this.firstindex = this.pager.startIndex;
    this.lastindex = this.pager.endIndex + 1;
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  submit() {
    if(this.CurrentCategoryNo == 1){
      this.speedtomarket = this.allItems;
    }
    else if(this.CurrentCategoryNo == 2){
      this.cost = this.allItems;
    }
    else if(this.CurrentCategoryNo == 3){
      this.quality = this.allItems;
    }
    else{
      this.changerate = this.allItems;
    }

    for(var i = 0; i < this.cost.length; i++){
    this.speedtomarket.push(this.cost[i]);
    }
    for(var i = 0; i < this.quality.length; i++){
      this.speedtomarket.push(this.quality[i]);
    }
    for(var i = 0; i < this.changerate.length; i++){
      this.speedtomarket.push(this.changerate[i]);
    }
    this.modifiedvalues = this.speedtomarket;
    this.metricscalc.updateMetricValues(this.modifiedvalues, this.projectUUID).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () =>{
        this.gotoHomeaftersubmit();
      }
    );
  }

  greyout(i,j){
    i.BeforeDevOpsHrs = 0.00;
    i.BeforeDevOpsCost = 0.00;
    i.AfterDevOpsHrs = 0.00;
    i.AfterDevOpsCost = 0.00;
   
    var lock = document.getElementById(5+"inputId"+j) as HTMLInputElement;
    if(lock.readOnly == true)
    {
      for(var k=1;k<=8;k++){
        console.log(k+"inputId"+j);
        var read = document.getElementById(k+"inputId"+j) as HTMLInputElement;
        read.readOnly = false;
        document.getElementById(k+"inputId"+j).setAttribute("style","background-color:none");
      }
      document.getElementById("9inputId"+j).setAttribute("src","assets/images/dnd.png");
    }
    else
    {
    for(var k=1;k<=8;k++){
      console.log(k+"inputId"+j);
      var read = document.getElementById(k+"inputId"+j) as HTMLInputElement;
      read.readOnly = true;
      document.getElementById(k+"inputId"+j).setAttribute("style","background-color:#dae2e8");
    }
    document.getElementById("9inputId"+j).setAttribute("src","assets/images/green.svg");
   }
  }

  gotoHome() {
    var result = confirm("you are about to leave the calculation without submitting");
    if (result == true)
      this._router.navigateByUrl('');
  }

  gotoHomeaftersubmit() {
     alert("Your Calculation is submitted successfully.");
      this._router.navigateByUrl('');
  }

  previousCategory(){
    if(this.CurrentCategoryNo == 4){
      this.CurrentCategoryNo = this.CurrentCategoryNo - 1;
      this.changerate = this.allItems;
      this.CurrentCategory = 'Quality';
      this.filterMetrics('Quality');
    }
    else if(this.CurrentCategoryNo == 3){
      this.CurrentCategoryNo = this.CurrentCategoryNo - 1;
      this.quality = this.allItems;
      this.CurrentCategory = 'Cost';
      this.filterMetrics('Cost');
    }
    else if(this.CurrentCategoryNo == 2){
      this.CurrentCategoryNo = this.CurrentCategoryNo - 1;
      this.cost = this.allItems;
      this.CurrentCategory = 'Speed To Market';
      this.filterMetrics('SpeedToMarket');
    }
  }

  nextCategory(){
    if(this.CurrentCategoryNo == 1){
      this.CurrentCategoryNo = this.CurrentCategoryNo + 1;
      this.speedtomarket = this.allItems;
      this.CurrentCategory = 'Cost';
      this.filterMetrics('Cost');
    }
    else if(this.CurrentCategoryNo == 2){
      this.CurrentCategoryNo = this.CurrentCategoryNo + 1;
      this.cost = this.allItems;
      this.CurrentCategory = 'Quality';
      this.filterMetrics('Quality');
    }
    else if(this.CurrentCategoryNo == 3){
      this.CurrentCategoryNo = this.CurrentCategoryNo + 1;
      this.quality = this.allItems;
      this.CurrentCategory = 'Change Rate';
      this.filterMetrics('ChangeRate');
    }
  }

}
