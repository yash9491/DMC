import { Component, OnInit } from '@angular/core';
import { PagerServiceService } from '../pager-service.service';
import { Speedtomarket } from '../Questions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public allItems: any;
  public pager: any = {}
  pagedItems: Speedtomarket[];
  name: any = "Devops";
  speedtomarket: Speedtomarket[];

  constructor(private _pagerservice: PagerServiceService, private _router:Router) {
    this.speedtomarket = [
      {
        QuestionId: 1,
        Question: 'What is the Agile implemetation duration ',
        BefDevHr: 23.96,
        AftDevHr: 18.56,
        BefDevCst: 256.36,
        AftDevCst: 120.00
      },
      {
        QuestionId: 2,
        Question: 'What is Planning stage duration',
        BefDevHr: 42.58,
        AftDevHr: 22.23,
        BefDevCst: 52.12,
        AftDevCst: 95.63
      },
      {
        QuestionId: 3,
        Question: 'What is the Agile implemetation duration',
        BefDevHr: 23.96,
        AftDevHr: 18.56,
        BefDevCst: 256.36,
        AftDevCst: 120.00
      },
      {
        QuestionId: 4,
        Question: 'What is Planning stage duration',
        BefDevHr: 42.58,
        AftDevHr: 22.23,
        BefDevCst: 52.12,
        AftDevCst: 95.63
      },
      {
        QuestionId: 5,
        Question: 'What is the Agile implemetation duration',
        BefDevHr: 23.96,
        AftDevHr: 18.56,
        BefDevCst: 256.36,
        AftDevCst: 120.00
      },
      {
        QuestionId: 6,
        Question: 'tttttttttttttttttttttttttttttttttt',
        BefDevHr: 20,
        AftDevHr: 30,
        BefDevCst: 56.36,
        AftDevCst: 20.00
      },
      {
        QuestionId: 7,
        Question: 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
        BefDevHr: 42.58,
        AftDevHr: 22.23,
        BefDevCst: 52.12,
        AftDevCst: 95.63
      },
      {
        QuestionId: 8,
        Question: 'yyyyyyyyyyyyyyyyyyyyyyyy',
        BefDevHr: 52,
        AftDevHr: 42.63,
        BefDevCst: 55,
        AftDevCst: 20.00
      },
      {
        QuestionId: 9,
        Question: 'hhhhhhhhhhhhhhhhhhhhhh',
        BefDevHr: 24.63,
        AftDevHr: 10.23,
        BefDevCst: 55.23,
        AftDevCst: 45.20
      },
      {
        QuestionId: 10,
        Question: 'ffffffffffffffffffffffffffffffff',
        BefDevHr: 23.96,
        AftDevHr: 18.56,
        BefDevCst: 256.36,
        AftDevCst: 120.00
      }
    ];
  }

  ngOnInit() {
    this.allItems = this.speedtomarket;
    this.setPage(1);
  }

  setPage(page: number) {
    this.pager = this._pagerservice.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  submit() {
    console.log(this.speedtomarket);
  }
  gotoHome(){
    alert("Are you sure to navaigate to Home page?");
    this._router.navigateByUrl('');
  }

}
