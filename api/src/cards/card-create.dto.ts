import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDTO {
  @IsString()
  @IsNotEmpty({ message: "Sorry! Card must have 'front' and 'back'" })
  front: string;

  @IsString()
  @IsNotEmpty({ message: "Sorry! Card must have 'front' and 'back'" })
  back: string;
}
