import { getFreshConnection } from "../db";
import { EventAttendees } from "../entity/EventAttendance";
import { EventNFT } from "../entity/EventNft";
import { EventRegistration } from "../entity/EventRegistration";
import { Events } from "../entity/Events";
import { RsvpEvent } from "../entity/RsvpEvent";
import { IEventData } from "../interfaces/IEventData";


export const saveNewEvent = async (payload: IEventData): Promise<Events> => {
  try {
    const connection = await getFreshConnection();
    const eventRepo = connection.getRepository(Events);

    const newEvent = new Events();
    newEvent.initialize(
      payload.name,
      payload.description,
      payload.eventEmail,
      payload.location,
      payload.eventCapacity,
      payload.eventOwner,
      payload.eventOnchainId,
      payload.requiredApproval,
      payload.eventStartDate,
      payload.eventEndDate
    );
    return await eventRepo.save(newEvent);
  } catch (error) {
    throw error;
  }
};

export const eventByOnchainId = async (eventId: Number): Promise<Events | null > => {
    const connection = await getFreshConnection();
    const eventRepo = connection.getRepository(Events);
    const event = await eventRepo.findOne({
      where: {eventOnchainId: eventId}
    })
    if(!event){
      return null;
    }
    return event
  }

  export const isEventOpenForRegistration = async (eventId: Number): Promise<Boolean> => {
    const connection = await getFreshConnection();
    const eventRepo = connection.getRepository(Events);
    const event = await eventRepo.findOne({
      where: {eventOnchainId: eventId}
    })
    if(event.openForRegistration){
      return true
    }
    return false
  }

    export const isRSVPForEvent = async (eventId: Number, attendeeAddress: String): Promise<Boolean> => {
    const connection = await getFreshConnection();
    const resvpEventRepo = connection.getRepository(RsvpEvent);
    const hasRsvpEvent = await resvpEventRepo.findOne({
      where: {eventId, attendeeAddress}
    })
    if(hasRsvpEvent){
      return true
    }
    return false
  }

  export const RSVPForEvent = async (payload: any): Promise<RsvpEvent> => {
  try {
    const connection = await getFreshConnection();
    const rsvpEventRepo = connection.getRepository(RsvpEvent);

    const newRsvpEvent = new RsvpEvent();
    newRsvpEvent.initialize(
      payload.evntId,
      payload.attendeeAddress
    );
    return await rsvpEventRepo.save(newRsvpEvent);
  } catch (error) {
    throw error;
  }
};

  // EventAttendees
      export const isEventAttendee = async (eventId: Number, attendeeAddress: String): Promise<Boolean> => {
    const connection = await getFreshConnection();
    const eventAttendeesRepo = connection.getRepository(EventAttendees);
    const hasEventAttendee = await eventAttendeesRepo.findOne({
      where: {eventId, attendeeAddress}
    })
    if(hasEventAttendee){
      return true
    }
    return false
  }

  export const markeventAttendance = async (payload: any): Promise<EventAttendees> => {
  try {
    const connection = await getFreshConnection();
    const eventAttendeesRepo = connection.getRepository(EventAttendees);

    const MarkEventAttenance = new EventAttendees();
    MarkEventAttenance.initialize(
      payload.evntId,
      payload.attendeeAddress
    );
    return await eventAttendeesRepo.save(MarkEventAttenance);
  } catch (error) {
    throw error;
  }
};

export const updateEventWithOnChainData = async (eventId: Number, eventData: any): Promise<boolean> => {
  const connection = await getFreshConnection()
  const eventRepo = connection.getRepository(Events)
  

  await eventRepo
  .createQueryBuilder()
  .update(Events)
  .set({
    name: eventData.name,
    location: eventData.location,
    eventOwner: eventData.eventOwner
  })
  .where({ eventOnchainId: eventId })
  .execute();

  return true;
}

  export const endEventRegistration = async (eventId: Number, eventOwner: string): Promise<boolean> => {
  const connection = await getFreshConnection()
  const eventRepo = connection.getRepository(Events)
  
  await eventRepo
  .createQueryBuilder()
  .update(Events)
  .set({
    openForRegistration: false
  })
  .where({ eventOnchainId: eventId, eventOwner })
  .execute();

  return true;
}

export const createEventFromIndexer = async (payload: any): Promise<Events> => {
  try {
    const connection = await getFreshConnection();
    const eventRepo = connection.getRepository(Events);

    const newEvent = new Events();
    newEvent.initializeEventOnchain(
      payload.name,
      payload.description,
      payload.location,
      payload.eventOwner,
      payload.eventOnchainId
    );
    return await eventRepo.save(newEvent);
  } catch (error) {
    throw error;
  }
};

export const registerforEventOnChain = async (payload: any): Promise<EventRegistration> => {
  try {
    const connection = await getFreshConnection();
    const eventRegistrationRepo = connection.getRepository(EventRegistration);

    const newEventRegistration = new EventRegistration();
    newEventRegistration.initialize(
      payload.eventId,
      payload.emailAddress,
      payload.userAddress,
      true,
    );
    return await eventRegistrationRepo.save(newEventRegistration);
  } catch (error) {
    throw error;
  }
};

export const hasUsserRegisteredforEvent = async (eventId: Number, userAddress: String): Promise<EventRegistration | null > => {
    const connection = await getFreshConnection();
    const eventRegistrationRepo = connection.getRepository(EventRegistration);
    const event = await eventRegistrationRepo.findOne({
      where: {eventId, userAddress}
    })
    if(!event){
      return null;
    }
    return event
  }


  export const nftForEventAddedAlready = async (eventId: Number, userAddress: String): Promise<EventNFT | null > => {
    const connection = await getFreshConnection();
    const eventNFTRepo = connection.getRepository(EventNFT);
    const eventNft = await eventNFTRepo.findOne({
      where: {eventId, userAddress}
    })
    if(!eventNft){
      return null;
    }
    return eventNft
  }

export const addNftForEvent = async (payload: any): Promise<EventNFT> => {
  try {
    const connection = await getFreshConnection();
    const eventNftRepo = connection.getRepository(EventNFT);

    const newNFTForEvent= new EventNFT();
    newNFTForEvent.initialize(
      payload.eventId,
      payload.userAddress,
      payload.nft
    );
    return await eventNftRepo.save(newNFTForEvent);
  } catch (error) {
    throw error;
  }
};
