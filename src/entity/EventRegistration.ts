


import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { EventRegistrationColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.EVENT_REGISTRATIONS })
export class EventRegistration extends DefualtEntity {
  @Column({ name: EventRegistrationColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: EventRegistrationColumns.EVENT_ID, nullable: true })
  eventId: number;

  @Column({ name: EventRegistrationColumns.EMAIL_ADDRESS, nullable: true})
  emailAddress: string;

  @Column({ name: EventRegistrationColumns.USER_ADDRESS, nullable: true})
  userAddress: string;

  @Column({ type: Boolean, name: EventRegistrationColumns.IS_ACTIVE, nullable: true})
  isActive: boolean;

initialize(eventId: number, emailAddress: string, userAddress: string, isActive: boolean
  ){
    const now = utcNow();
    this.eventId = eventId,
    this.emailAddress = emailAddress,
    this.userAddress = userAddress,
    this.uuid = uuidv4();
    this.createdAt = now;
    return this
  }

}


