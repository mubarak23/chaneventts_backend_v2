export interface NewEventAdded  {
  name: String,
  event_id: Number,
  location: String,
  event_owner: String,
};

export interface RegisteredForEvent {
    event_id: Number,
    event_name: String,
    user_address: String,
};

export interface EndEventRegistration {
  event_id: Number,
    event_name: String,
    event_owner: String,
};

export interface RSVPForEvent {
    event_id: Number,
    attendee_address: String,
};

export interface EventAttendanceMark {
    event_id: Number,
    user_address: String,
};
