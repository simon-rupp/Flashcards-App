import { User } from "src/user/user.entity";
import { Card } from "src/cards/card.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Deck {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  numberOfCards: number;

  @ManyToOne(() => User, (user) => user.decks)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
