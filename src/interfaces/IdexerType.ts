export interface NewEventAdded  {
  name: String,
  event_id: Number,
  location: String,
  event_owner: String,
};

export interface RegisteredForEvent {
    eventId: Number,
    emailAddress: String,
    userAddress: String,
};

export interface EndEventRegistration {
  eventId: Number,
    eventName: String,
    eventOwner: String,
};

export interface RSVPForEvent {
    event_id: Number,
    attendee_address: String,
};

export interface EventAttendanceMark {
    event_id: Number,
    user_address: String,
};
