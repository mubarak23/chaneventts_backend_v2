import { FieldElement, v1alpha2 as starknet } from "@apibara/starknet";
import { uint256 } from "starknet";
import * as EventsService from "../services/eventsService";
import {
  NewEventAdded,
  RegisteredForEvent,
  EventAttendanceMark,
  EndEventRegistration,
  RSVPForEvent,
} from "../interfaces/IdexerType";
import {hexToAscii} from "../utils/tohexAscii"


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
