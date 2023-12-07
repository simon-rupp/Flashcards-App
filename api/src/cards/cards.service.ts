import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDTO } from "./card-create.dto";
import { DecksService } from "../decks/decks.service";
import { UpdateCardDto } from "./card-update.dto";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  async create(createCardDto: CreateCardDTO, deckId: string): Promise<Card> {
    const card = this.cardRepository.create({
      ...createCardDto,
      deckId, // Associate the card with a deck
    });

    await this.decksService.incrementCardCounter(deckId);

    return this.cardRepository.save(card);
  }

  // Returns all titles that match the given criteria.
  async findAll(
    limit: number,
    offset: number,
    deckId?: string,
    search?: string,
    withDeckData?: boolean,
  ): Promise<Card[]> {
    const front = search ? ILike(`%${search}%`) : undefined;
    const back = search ? ILike(`%${search}%`) : undefined;
    const relations = [];

    if (withDeckData) {
      relations.push("deck");
    }

    const cards = await this.cardRepository.find({
      take: limit,
      skip: offset,
      where: [
        { deckId, front, back },
        { deckId, front },
        { deckId, back },   
      ],
      order: {
        createdAt: "DESC",
      },
      relations,
    });

    return cards;
  }

  async findOne(id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card | null> {
    const card = await this.cardRepository.preload({ id, ...updateCardDto });
    if (!card) {
      return null;
    }
    return this.cardRepository.save(card);
  }

  async remove(id: string): Promise<Card | null> {
    const card = await this.findOne(id);
    if (!card) {
      return null;
    }

    await this.decksService.decrementCardCounter(card.deckId);
    
    return this.cardRepository.remove(card);
  }
}
