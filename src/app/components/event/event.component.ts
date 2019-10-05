import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { EventService } from "src/app/services/event.service";
import { EVENTS } from "src/app/models/mock-events";
import { Event } from "src/app/models/event";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  // Events
  events: Event[] = EVENTS;
  selectedEvent: Event;
  isSearch = false;
  perPage = 2;
  countEvents = 0;

  // Form
  EventForm: FormGroup;
  submitted = false;

  constructor(private eventS: EventService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.events = this.eventS.paginate(0, this.perPage);
    this.EventForm = this.formBuilder.group({
      numberOfTickets: ["", Validators.required],
      tickets: new FormArray([])
    });
  }

  // EVENTS
  onSelect(event: Event) {
    this.selectedEvent = { ...event };
  }

  playParent($event: Event) {
    this.events = EVENTS.map(event => {
      if (event.id === $event.id) {
        event.status = `on`;
        return event;
      } else {
        event.status = `off`;
        return event;
      }
    });
  }

  searchParent($event: Event[]) {
    this.events = $event;
    this.isSearch = true;
  }

  reload() {
    // reload propre à ce component
    this.events = this.eventS.paginate(0, this.perPage);
    this.isSearch = false;
  }

  relaodParent($event: boolean) {
    // reload déclenché à partir d'un événement de l'enfant
    this.isSearch = false;
    this.events = this.eventS.paginate(0, this.perPage);
  }

  paginateParent($event: { start: number; end: number }) {
    const { start, end } = $event;
    this.events = this.eventS.paginate(start, end);
  }

  // FORM
  get f() {
    return this.EventForm.controls;
  }
  
  get t() {
    return this.f.tickets as FormArray;
  }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(
          this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]]
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.EventForm.invalid) {
      return;
    }

    // display form values on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.EventForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.EventForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
}
