import { Body, Controller, Get, Path, Post, Request, Route, Tags } from "tsoa";
import { getFreshConnection } from "../db";
import { IEventDto } from "../dto/IEventDto";
import { Events } from "../entity/Events";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as EventsService from "../services/eventsService";
import { NotFoundError } from "../utils/error-response-types";

@Route("/api/event")
@Tags("Events Service")
export class EventsController extends Controller {

  @Post("/create")
  public async createEvent(@Body() requestBody: IEventDto): Promise<IServerResponse<any>> {
    const eventPayloadData = requestBody;
    const newEvent = await EventsService.saveNewEvent(eventPayloadData)
    this.setStatus(201);
    const resData: IServerResponse<any> = {
      status: true,
      data: newEvent,
    };
    return resData;
  }

  // fetch event by onchain id and eventId
  @Get("/:onchainId")
  public async eventDetailsByOnchainId(@Request() req: any, @Path("onchainId") onchainId: number): Promise<IServerResponse<any>> {

    const connection = await getFreshConnection();
    const eventRepo = connection.getRepository(Events);
    const eventDetails = await eventRepo.findOne({ eventOnchainId: onchainId });

    if (!eventDetails) {
      throw new NotFoundError("Event was not found");
    }

    const resData: IServerResponse<any> = {
      status: true,
      data: eventDetails,
    };
    return resData;
  }
  
  
  @Get("/:eventId")
  public async orderDetails(@Request() req: any, @Path("eventId") eventId: number): Promise<IServerResponse<any>> {

    const connection = await getFreshConnection();
    const eventRepo = connection.getRepository(Events);
    const eventDetails = await eventRepo.findOne({ id: eventId });

    if (!eventDetails) {
      throw new NotFoundError("Event was not found");
    }

    const resData: IServerResponse<any> = {
      status: true,
      data: eventDetails,
    };
    return resData;
  }
  


}