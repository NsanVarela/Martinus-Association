import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { EVENTS } from '../models/mock-events';
import { Event } from '../models/Event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Event[] = EVENTS;
  sendCurrentNumberPage: Subject<number> = new Subject() ;

  constructor() { }

  currentPage(page: number) { return this.sendCurrentNumberPage.next(page); }

  initSubject() {
    if
    (this.sendCurrentNumberPage.closed) {
      this.sendCurrentNumberPage = new Subject();
    }
  }

  getEvents(): Event[] {
    return this.events;
  }

  getEvent(id: string): Event {
    return this.events.find( event => event.id === id );
  }

  initStatus(): void {
    this.events = this.events.map(event => { event.status = `off` ; return event ; });
  }

  count() {
    return this.events.length;
  }

  paginate(start: number, end: number): Event[] {
    return this.events.slice(start, end);
  }
}
