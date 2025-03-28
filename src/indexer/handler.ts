import { FieldElement } from "@apibara/starknet";
import { uint256 } from "starknet";
import {
  NewEventAdded,
  RegisteredForEvent,
  RSVPForEvent,
  EventNFTData
} from "../interfaces/IndexerType";
import * as EventsService from "../services/eventsService";
import { hexToAscii } from "../utils/tohexAscii";


export async function handleNewEventAdded(event: any) {
  // NewEventAdded payload 
  const data = event.data;

  const eventDetails: NewEventAdded = {
    name: hexToAscii(FieldElement.toHex(data[0]).toString()),
    event_id: parseInt(
      uint256
        .uint256ToBN({
          low: FieldElement.toBigInt(data[1]),
          high: FieldElement.toBigInt(data[2]),
        })
        .toString()
    ),
    location: hexToAscii(FieldElement.toHex(data[3]).toString()),
    event_owner: FieldElement.toHex(data[4]).toString(),
  };

  let eventExists = await EventsService.eventByOnchainId(eventDetails.event_id)
  

  if (eventExists) {
    // UPDATE THE EVENT
    await EventsService.updateEventWithOnChainData(eventDetails.event_id, eventDetails);
    console.log("Updating Event that already exists");
    return;
  }
  
  await EventsService.createEventFromIndexer(eventDetails);
}

export async function handleRegisteredForEvent(event: any) {

  // RegisteredForEvent
  const data = event.data;

  const registeredForEvent: RegisteredForEvent = {
    eventId: parseInt(
      uint256
        .uint256ToBN({
          low: FieldElement.toBigInt(data[0]),
          high: FieldElement.toBigInt(data[1]),
        })
        .toString()
    ),
    emailAddress: hexToAscii(FieldElement.toHex(data[2]).toString()),
    userAddress: FieldElement.toHex(data[3]).toString(),
  };

  // check if event is open for registration 

  const isEventOpenForRegistration = await EventsService.isEventOpenForRegistration(registeredForEvent.eventId);
  if (!isEventOpenForRegistration) {
    console.log("event is closed for registration");
    return;
  }
  console.log(registeredForEvent);

  const hasRegistered = await EventsService.hasUsserRegisteredforEvent(registeredForEvent.eventId, registeredForEvent.userAddress)
  if (hasRegistered) {
    console.log("User has already registered for the event");
    return;
  }
  // register_for_event
  await EventsService.registerforEventOnChain(registeredForEvent)
 
}


export async function handleEndEventRegistration(event: any) {
  // EndEventRegistration
  const data = event.data;

  const endEventRegistration = {
    eventId: parseInt(
      uint256
        .uint256ToBN({
          low: FieldElement.toBigInt(data[0]),
          high: FieldElement.toBigInt(data[1]),
        })
        .toString()
    ),
    eventName: hexToAscii(FieldElement.toHex(data[2]).toString()),
    eventOwner: FieldElement.toHex(data[3]).toString(),
  };

  console.log(endEventRegistration);

  const eventExists = await EventsService.eventByOnchainId(endEventRegistration.eventId);
  if (!eventExists) {
    console.log("Event does not exist");
    return;
  }
  await await EventsService.endEventRegistration(endEventRegistration.eventId, endEventRegistration.eventOwner,);
}


export async function handleRSVPForEvent(event: any) {
  // RSVPForEvent
  const data = event.data;

  const rsvpForEvent: RSVPForEvent = {
    eventId: parseInt(
      uint256
        .uint256ToBN({
          low: FieldElement.toBigInt(data[0]),
          high: FieldElement.toBigInt(data[1]),
        })
        .toString()
    ),
    attendeeAddress: FieldElement.toHex(data[2]).toString(),
  };

  console.log(rsvpForEvent);

  const hasRSVPed = await EventsService.isRSVPForEvent(rsvpForEvent.eventId, rsvpForEvent.attendeeAddress)
  if (hasRSVPed) {
    console.log("User has already RSVPed");
    return;
  }
  return EventsService.RSVPForEvent(rsvpForEvent);
  
}

export async function handleEventAttendanceMark(event: any) {
  // EventAttendanceMark
  const data = event.data;

  const eventAttendanceMark = {
    eventId: parseInt(
      uint256
        .uint256ToBN({
          low: FieldElement.toBigInt(data[0]),
          high: FieldElement.toBigInt(data[1]),
        })
        .toString()
    ),
    userAddress: FieldElement.toHex(data[2]).toString(),
  };

  console.log(eventAttendanceMark);

  const hasMarkedAttendance = await EventsService.isEventAttendee(eventAttendanceMark.eventId, eventAttendanceMark.userAddress)
  if (hasMarkedAttendance) {
    console.log("User has already marked attendance");
    return;
  }
  return EventsService.markeventAttendance(eventAttendanceMark);
}

export async function handleRegisteredForEventNft(event: any) {

  const data = event.data;

  const eventNFT: EventNFTData = {
    eventId: parseInt(
      uint256
        .uint256ToBN({
          low: FieldElement.toBigInt(data[0]),
          high: FieldElement.toBigInt(data[1]),
        })
        .toString()
    ),
    userAddress: FieldElement.toHex(data[3]).toString(),
    nft: FieldElement.toHex(data[4]).toString(),
  };

  const isNftAddedForEvent = await EventsService.nftForEventAddedAlready(eventNFT.eventId, eventNFT.userAddress);
  if (!isNftAddedForEvent) {
    console.log("event is closed for registration");
    return;
  }
  console.log(isNftAddedForEvent);
  
  await EventsService.addNftForEvent(eventNFT)
 
}

