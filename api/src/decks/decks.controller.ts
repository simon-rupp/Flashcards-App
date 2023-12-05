import {
  Controller,
  Body,
  Post,
  Patch,
  Delete,
  Param,
  Get,
  NotFoundException,
  Query,
} from "@nestjs/common";
import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./deck-create.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { FindDecksQueryDTO } from "./find-decks-query.dto";
import { FindDecksResponseDTO } from "./find-decks-response.dto";

@UseGuards(JwtAuthGuard)
@Controller("decks")
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.create(createDeckDto, userId);
    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<DeckResponseDto> {
    const deck = await this.decksService.findOne(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.update(id, updateDeckDto);

    delete deck.userId;
    return deck;
  }

  @UseGuards(DeckOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const deck = await this.decksService.remove(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: "Deck deleted successfully",
    };
  }

  @Get()
  async findAll(
    @Query() query: FindDecksQueryDTO,
  ): Promise<FindDecksResponseDTO> {
    const { limit, offset, search, withUserData } = query;
    const decks = await this.decksService.findAll(
      limit,
      offset,
      search,
      withUserData,
    );
    return {
      search,
      limit,
      offset,
      data: decks.map((deck) => {
        delete deck.userId;
        if (deck.user) {
          delete deck.user.password;
        }
        return deck;
      }),
    };
  }
}
