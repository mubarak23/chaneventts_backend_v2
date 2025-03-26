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
    eventId: Number,
    attendeeAddress: String,
};

export interface EventAttendanceMark {
    eventId: Number,
    attendeeAddress: String,
};

export interface EventNFTData {
    eventId: Number,
    userAddress: String,
    nft: String
};
