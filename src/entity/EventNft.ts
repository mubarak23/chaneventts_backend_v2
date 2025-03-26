
import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { EvenNftColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.EVENT_NFT })
export class EventNFT extends DefualtEntity {
  @Column({ name: EvenNftColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: EvenNftColumns.EVENT_ID, nullable: true })
  eventId: number;

  @Column({ name: EvenNftColumns.USER_ADDRESS, nullable: true})
  userAddress: string;

  @Column({ name: EvenNftColumns.NFT, nullable: true})
  nft: string;

initialize(eventId: number, userAddress: string, nft: string
  ){
    const now = utcNow();
    this.eventId = eventId,
    this.userAddress = userAddress,
    this.nft = nft,
    this.uuid = uuidv4();
    this.createdAt = now;
    return this
  }

}
