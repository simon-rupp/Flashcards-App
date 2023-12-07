import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { CardsService } from "./cards.service";
import { CardsController } from "./cards.controller";
import { DecksService } from "src/decks/decks.service";
import { Deck } from "src/decks/deck.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Deck])],
  providers: [CardsService, DecksService],
  controllers: [CardsController],
})
export class CardsModule {}
