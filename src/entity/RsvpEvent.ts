




import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { RsvpEventColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.RSVP_EVENT })
export class RsvpEvent extends DefualtEntity {
  @Column({ name: RsvpEventColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: RsvpEventColumns.EVENT_ID, nullable: true })
  eventId: number;

  @Column({ name: RsvpEventColumns.ATTENDEE_ADDRESS, nullable: true})
  attendeeAddress: string;

initialize(eventId: number, attendeeAddress: string,
  ){
    const now = utcNow();
    this.eventId = eventId,
    this.attendeeAddress = attendeeAddress,
    this.uuid = uuidv4();
    this.createdAt = now;
    return this
  }

}
