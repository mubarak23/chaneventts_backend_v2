





import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { EventAttendanceColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.EVENT_ATTENDEES })
export class EventAttendees extends DefualtEntity {
  @Column({ name: EventAttendanceColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: EventAttendanceColumns.EVENT_ID, nullable: true })
  eventId: number;

  @Column({ name: EventAttendanceColumns.ATTENDEE_ADDRESS, nullable: true})
  userAddress: string;

initialize(eventId: number, userAddress: string,
  ){
    const now = utcNow();
    this.eventId = eventId,
    this.userAddress = userAddress,
    this.uuid = uuidv4();
    this.createdAt = now;
    return this
  }

}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("events_attendance", function (table) {
    table.increments("id").primary();
    table.string("event_id").notNullable();
    table.string("user_address").notNullable();
    table.timestamps(true, true);

    // Composite unique constraint
    table.unique(["event_id", "user_address"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists("events_attendance");
};

