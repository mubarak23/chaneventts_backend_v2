import { getFreshConnection } from "../db";
import { Events } from "../entity/Events";
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

export const eventByOnchainId = async (eventId: number): Promise<Events | null > => {
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

  export const updateEventWithOnChainData = async (eventId: number, eventData: any): Promise<boolean> => {
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

