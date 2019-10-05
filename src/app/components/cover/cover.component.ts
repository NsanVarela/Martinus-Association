import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  title: string;
  baseline: string;

  constructor() {
    this.title = `Martinu's`;
    this.baseline = `Education, parchemin de la vie`;
  }

  ngOnInit() {
  }

}
