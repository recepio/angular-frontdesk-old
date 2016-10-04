import {Component, OnInit} from '@angular/core';
declare var moment: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  today: Date; //
  days: number[] = []; // arr for days
  rooms: number[] = []; // arr for rooms
  widthColumn: number; //
  widthDay: number = 15; // width day col
  timelineMarginRight: number = 0; // save margin
  nextButtonClick: number = 0; // counter clicks
  disableButton: string = 'disabled';

  indexOfLastArrElement: number = 0;
  nextMonth: Date;
  prevMonth: Date;

  constructor() {
    this.today = new Date();
    this.createDays();
    this.createRooms();

    this.nextMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1);
    this.prevMonth = new Date(this.today);

  }

  ngOnInit(): void {
    let timeLineWidth: number = document.body.offsetWidth;
    this.widthColumn = timeLineWidth / this.widthDay;
    this.widthColumn = +this.widthColumn.toFixed(2);
    //this.timelineMarginRight = -this.widthColumn;

  }

  ngAfterViewInit() {
    // Component views are initialized
    Array.from(document.body.querySelectorAll('.room-fixed')).forEach((item:HTMLElement) => item.style.position = 'absolute');
  }

  // create mocks days
  createDays(): void {
    let today: Date = new Date();
    today.setDate(today.getDate() - 5);
    for (let i = 0; i < this.widthDay; i++) {
      this.days.push(today.setDate(today.getDate() + 1));
    }
  }

  // create mocks rooms
  createRooms(): void {
    for (let i = 1; i < 50; i++) {
      this.rooms.push(i);
    }
  }


  timelineButtonClick(typeOfClick: string): void {
    let lastDay: Date = new Date(this.days[this.days.length - 1]);

    if (typeOfClick === 'nextClick') {

      this.days.push(lastDay.setDate(lastDay.getDate() + 1));

      this.timelineMarginRight += -this.widthColumn;
      this.nextButtonClick++;
      this.disableButton = '';

    }

    if (typeOfClick === 'prevClick') {
      if (this.nextButtonClick !== 0) {
        this.timelineMarginRight += this.widthColumn;
        this.nextButtonClick--;
        this.indexOfLastArrElement++;
      } else {
        this.disableButton = 'disabled';
        this.timelineMarginRight = this.widthColumn;
      }
    }

    // 2 - this is FIXME
    let lastDayonView = new Date(this.days[this.days.length - (2 + this.indexOfLastArrElement)]);

    this.prevMonth = new Date(lastDayonView.getFullYear(), lastDayonView.getMonth() - 1);
    this.nextMonth = new Date(lastDayonView.getFullYear(), lastDayonView.getMonth());
    //console.log(lastDayonView);

  }

}
