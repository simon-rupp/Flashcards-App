import { Deck } from "../decks/deck.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  front: string;

  @Column()
  back: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Deck, (deck) => deck.cards, { onDelete: "CASCADE" })
  @JoinColumn({ name: "deckId" })
  deck: Deck;

  @Column()
  deckId: string;
}
