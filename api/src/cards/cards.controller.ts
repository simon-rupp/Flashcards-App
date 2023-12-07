import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
  Patch,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateCardDTO } from "./card-create.dto";
import { CardResponseDTO } from "./card-response.dto";
import { FindCardsQueryDTO } from "./find-cards-query.dto";
import { FindCardsResponseDTO } from "./find-cards-response.dto";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { UpdateCardDto } from "./card-update.dto";

@UseGuards(JwtAuthGuard)
@Controller("decks/:deckId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @Body() createCardDto: CreateCardDTO,
    @Param("deckId") deckId: string,
  ): Promise<CardResponseDTO> {
    return await this.cardsService.create(createCardDto, deckId);
  }

  @Get()
  async findAll(
    @Param("deckId") deckId: string,
    @Query() query: FindCardsQueryDTO,
  ): Promise<FindCardsResponseDTO> {
    const { limit, offset, search, withDeckData } = query;

    const cards = await this.cardsService.findAll(
      limit,
      offset,
      deckId,
      search,
      withDeckData,
    );

    return {
      limit,
      offset,
      search,
      withDeckData,
      data: cards.map((card) => {
        return card;
      }),
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardResponseDTO> {
    const card = await this.cardsService.update(id, updateCardDto);
    return card;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CardResponseDTO> {
    const card = await this.cardsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const card = await this.cardsService.remove(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: "Card deleted successfully",
    };
  }
}
