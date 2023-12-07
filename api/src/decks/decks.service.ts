import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
  ) {}

  async create(createPostDto: CreateDeckDto, userId: number): Promise<Deck> {
    const post = await this.deckRepository.create({
      ...createPostDto,
      userId,
    });
    return this.deckRepository.save(post);
  }

  async findOne(id: string): Promise<Deck | null> {
    return this.deckRepository.findOneBy({ id });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck | null> {
    const deck = await this.deckRepository.preload({ id, ...updateDeckDto });
    if (!deck) {
      return null;
    }
    return this.deckRepository.save(deck);
  }

  async remove(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    return this.deckRepository.remove(deck);
  }

  async findAll(
    limit: number,
    offset: number,
    search?: string,
    withUserData?: boolean,
  ): Promise<Deck[]> {
    const queryBuilder = this.deckRepository.createQueryBuilder("decks");

    if (withUserData) {
      queryBuilder.leftJoinAndSelect("decks.user", "user");
    }

    if (search !== undefined) {
      queryBuilder.where("decks.title ILIKE :search", {
        search: `%${search}%`,
      });
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);

    queryBuilder.orderBy("decks.createdAt", "DESC");

    return await queryBuilder.getMany();
  }

  async incrementCardCounter(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }

    deck.numberOfCards += 1;
    await this.deckRepository.save(deck);
    return deck;
  }
}
