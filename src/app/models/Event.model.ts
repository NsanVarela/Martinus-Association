export class Event {
  id: string;
  ref: string;
  name: string;
  startDate?: string;
  endDate?: string;
  place: string;
  description: string;
  schedules?: string;
  status: string;
  coverUrl?: string;
  websiteUrl?: string;
  tags?: Array<string>;
  like?: string;
}

export class EventList {
  id: string;
  eventList: Array<string>;
}
