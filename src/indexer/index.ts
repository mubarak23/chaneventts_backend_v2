import { StreamClient, v1alpha2 } from "@apibara/protocol";
import {
  FieldElement,
  Filter, StarkNetCursor, v1alpha2 as starknet
} from "@apibara/starknet";
import { eventsIndexers } from "../enums/EventIndexer";
import {
  handleNewEventAdded
  // handleEndEventRegistration, handleEventAttendanceMark, handleNewEventAdded,
  // handleRegisteredForEvent, handleRSVPForEvent
} from "./handler";

const client = new StreamClient({
  url: process.env.DNA_CLIENT_URL || "", // Fallback to empty string if undefined
  clientOptions: {
    "grpc.max_receive_message_length": 100 * 1024 * 1024, // 100MB
  },
  token: process.env.DNA_TOKEN || "", // Fallback to empty string if undefined
});

// Create filter combining all event handlers
const filter = Filter.create().withHeader({ weak: true });

// Map your events to handlers
const eventHandlers = {
  [eventsIndexers.NewEventAdded]: handleNewEventAdded,
  // [eventsIndexers.RegisteredForEvent]: handleRegisteredForEvent,
  // [eventsIndexers.EventAttendanceMark]: handleEventAttendanceMark,
  // [eventsIndexers.EndEventRegistration]: handleEndEventRegistration,
  // [eventsIndexers.RSVPForEvent]: handleRSVPForEvent,
};

// Add all events to filter
Object.keys(eventHandlers).forEach((eventKey) => {
  filter.addEvent((event) =>
    event.withKeys([FieldElement.fromBigInt(BigInt(eventKey))])
  );
});

// Start indexer function
export async function startIndexer() {
  client.configure({
    filter: filter.encode(),
    batchSize: 1,
    finality: v1alpha2.DataFinality.DATA_STATUS_FINALIZED,
    cursor: StarkNetCursor.createWithBlockNumber(0),
  });

  for await (const message of client) {
    if (message.message === "data") {
      const { data } = message.data || {}; // Ensure `data` is not undefined
      if (!data) continue;

      for (const item of data) {
        const block = starknet.Block.decode(item);
        for (const event of block.events) {
          if (!event.event || !event.event.keys || event.event.keys.length === 0) continue;
          const eventKey = FieldElement.toHex(event.event.keys[0]);
          const handler = eventHandlers[eventKey];
          console.log("event data:", event.event)
          if (handler) {
            await handler(event.event);
          }
        }
      }
    }
  }
}
