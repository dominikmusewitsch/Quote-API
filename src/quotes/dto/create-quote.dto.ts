import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Quote text must not be empty' })
  @MaxLength(500, { message: 'Quote must not exceed 500 characters' })
  quote: string;

  @IsString()
  @IsNotEmpty({ message: 'Author must not be empty' })
  @MaxLength(100, { message: 'Author name must not exceed 100 characters' })
  author: string;
}
