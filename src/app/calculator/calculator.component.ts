import { Component, OnInit } from '@angular/core';
import {PagerServiceService} from '../pager-service.service';
import {Speedtomarket} from '../Questions';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public allItems: any;
  public pager: any = {}
  pagedItems: any[];
  name: any="Devops";
  speedtomarket: Speedtomarket[];

  constructor(private _pagerservice: PagerServiceService) {
    this.speedtomarket = [
      {
        QuestionId: 1, 
        Question:'What is Devops Durations',
        BefDevHr: 23.96,
        AftDevHr: 18.56,
        BefDevCst: 256.36,
        AftDevCst: 120.00
      },
      {
        QuestionId: 2, 
        Question:'What is Planning Duration',
        BefDevHr: 42.58,
        AftDevHr: 22.23,
        BefDevCst: 52.12,
        AftDevCst: 95.63
      }
    ];
  }

  ngOnInit() {
  }

  setPage(page: number) {
  this.pager = this._pagerservice.getPager(this.allItems.length, page);
  this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
submit(){
  console.log(this.speedtomarket);
}

}
