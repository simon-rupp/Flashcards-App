import { Module } from "@nestjs/common";
import { DecksService } from "./decks.service";
import { DecksController } from "./decks.controller";
import { Deck } from "./deck.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  providers: [DecksService],
  controllers: [DecksController],
})
export class DecksModule {}
