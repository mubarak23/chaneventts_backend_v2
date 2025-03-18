import { Body, Controller, Post, Route, Tags } from "tsoa";
import { IEventDto } from "../dto/IEventDto";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as EventsService from "../services/eventsService";

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



}