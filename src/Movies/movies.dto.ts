import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  poster: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  length: number;

  //   @IsDate()
  @IsOptional()
  released_date?: Date;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
