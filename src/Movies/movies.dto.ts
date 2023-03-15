import {
  IsString,
  MaxLength,
  IsNumberString,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  poster: string;

  @IsNumberString()
  length: number;

  //   @IsDate()
  @IsOptional()
  released_date?: Date;

  @IsNumberString()
  rating: number;
}
