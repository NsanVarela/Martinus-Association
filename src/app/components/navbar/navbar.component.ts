import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  baseline = `Éducation, parchemin de la vie`

  constructor() { }

  ngOnInit() {
  }

}
