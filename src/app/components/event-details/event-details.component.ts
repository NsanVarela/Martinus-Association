import { Component, OnInit, OnChanges, Input } from "@angular/core";

import { EventService } from "../../services/event.service";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.scss"]
})
export class EventDetailsComponent implements OnInit, OnChanges {
  @Input() event;
  hideEvent: boolean = true; // par défaut on le cache

  constructor(private eventService: EventService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.event) {
      this.hideEvent = false;
      const details = this.eventService.getEvent(this.event);
      // console.log("details", details);
    }
  }

  hide() {
    this.hideEvent = true;
    this.eventService.initStatus();
  }
}
