


import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { EventColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.EVENTS })
export class Events extends DefualtEntity {
  @Column({ name: EventColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: EventColumns.NAME, nullable: true })
  name: string;

  @Column({ name: EventColumns.DESCRIPTION, nullable: true})
  description: string;

  @Column({ name: EventColumns.LOCATION, nullable: true})
  location: string;

  @Column({ name: EventColumns.EVENT_OWNER, nullable: true})
  eventOwner: string;

  @Column({ name: EventColumns.EVENT_EMAIL, nullable: true})
  eventEmail: string;

  @Column({ name: EventColumns.EVENT_ONCHAIN_ID, nullable: true})
  eventOnchainId: number;

  @Column({ name: EventColumns.REQUIRED_APPROVAL, nullable: true})
  requiredApproval: boolean;

  @Column({ name: EventColumns.EVENT_CAPACITY, nullable: true})
  eventCapacity: number;

  @Column({ name: EventColumns.TICKET, nullable: true})
  ticket: string;
  
  @Column({ name: EventColumns.EVENT_TYPE, nullable: true})
  eventType: string;

  @Column({ name: EventColumns.EVENT_MODE, nullable: true})
  eventMode: string;

 @Column({type: 'bigint', name: EventColumns.TICKET_AMOUNT, nullable: true, transformer: new ColumnNumericTransformer() })
  ticketAmount: number;

 @Column({ name: EventColumns.EVENT_START_DATE, nullable: true})
  eventStartDate: string;

  @Column({ name: EventColumns.EVENT_END_DATE, nullable: true})
  eventEndDate: string;

  @Column({ name: EventColumns.OPEN_FOR_REGISTRATION, nullable: true})
  openForRegistration: boolean;

 @Column({  type:"jsonb", name: EventColumns.EVENT_IMAGE, nullable: true})
  eventImage: SimpleImageJson[]


initialize(name: string, description: string, eventEmail: string, location: string,
    eventCapacity: number, eventOwner: string, eventOnchainId: number, requiredApproval: boolean,
    eventStartDate: string, eventEndDate: string
  ){
    const now = utcNow();
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.location = location,
    this.eventOwner = eventOwner,
    this.eventEmail = eventEmail,
    this.eventCapacity = eventCapacity,
    this.eventOnchainId = eventOnchainId,
    this.eventStartDate = eventStartDate,
    this.eventEndDate = eventEndDate
    this.createdAt = now;
    return this
  }

  initializeEventOnchain(name: string, description: string, location: string,
   eventOwner: string, eventOnchainId: number 
  ){
    const now = utcNow();
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.location = location,
    this.eventOwner = eventOwner,
    this.eventOnchainId = eventOnchainId,
    this.createdAt = now;
    return this
  }
}

