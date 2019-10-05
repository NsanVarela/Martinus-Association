import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { EventService } from "../../services/event.service";

@Component({
  selector: "app-paginate",
  templateUrl: "./paginate.component.html",
  styleUrls: ["./paginate.component.scss"]
})
export class PaginateComponent implements OnInit, OnDestroy {
  @Output() paginate: EventEmitter<{
    start: number;
    end: number;
  }> = new EventEmitter();
  @Input() perPage: number; // dans le selecteur du paginate depuis le parent

  pages: number[] = []; // numéro des pages 1, 2, 3, ...
  total = 0; // total des évènements
  currentPage: number; // page courante
  numberPages = 0;

  constructor(private eventS: EventService) {
    this.total = this.eventS.count();
    console.log(this.total);
  }

  ngOnInit() {
    // initialiser la création des numéros de page
    this.init();

    // il faut souscrire à l'observable
    // écoute et l'observer reçoit l'info
    if (this.eventS.sendCurrentNumberPage.closed) {
      this.eventS.initSubject();
    }

    this.eventS.sendCurrentNumberPage.subscribe(page => {
      console.log(page);
      this.currentPage = page;
    });
  }

  init(page: number = 1) {
    this.numberPages = Math.ceil(this.total / this.perPage);
    this.currentPage = page;

    for (let p = 0; p < this.numberPages; p++) {
      this.pages.push(p + 1);
    }
  }

  selectedPage(page: number) {
    this.currentPage = page;

    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;

    this.paginate.emit({ start, end });

    // notifier aux observers le numéro de la page
    this.eventS.currentPage(page);
  }

  next() {
    this.currentPage =
      this.currentPage === this.numberPages ? 1 : this.currentPage + 1;
    this.selectedPage(this.currentPage);
  }

  previous() {
    this.currentPage =
      this.currentPage === 1 ? this.numberPages : this.currentPage - 1;
    this.selectedPage(this.currentPage);
  }

  // component est retiré du DOM
  ngOnDestroy() {
    console.log("destroy...");

    // une fois le component démonté on se désinscrit au Subject
    this.eventS.sendCurrentNumberPage.unsubscribe();
  }
}
