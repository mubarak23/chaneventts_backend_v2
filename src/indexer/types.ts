export const NewEventAdded = {
  name: String,
  event_id: Number,
  location: String,
  event_owner: String,
};

export const RegisteredForEvent = {
    event_id: Number,
    event_name: String,
    user_address: String,
};

export const EndEventRegistration = {
  event_id: Number,
    event_name: String,
    event_owner: String,
};

export let RSVPForEvent = {
    event_id: Number,
    attendee_address: String,
};

export let EventAttendanceMark = {
    event_id: Number,
    user_address: String,
};
