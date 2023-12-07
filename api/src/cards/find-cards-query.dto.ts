import {
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  IsString,
  Max,
  IsBoolean,
} from "class-validator";

export class FindCardsQueryDTO {
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit: number = 10;

  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBoolean()
  @IsOptional()
  withDeckData?: boolean;
}
