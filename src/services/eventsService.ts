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
