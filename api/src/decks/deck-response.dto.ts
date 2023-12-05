import { UserResponseDTO } from "src/user/user-response.dto";

export class DeckResponseDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  numberOfCards: number;
  user?: UserResponseDTO;
}
