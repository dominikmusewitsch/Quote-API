import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Quote } from './entity/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @Public()
  async getAllQuotes(): Promise<Quote[]> {
    return this.quotesService.getAllQuotes();
  }

  @Public()
  @Get('random')
  async getRandomQuote(): Promise<Quote> {
    return this.quotesService.getRandomQuote();
  }

  @Public()
  @Get(':id')
  async getOneQuote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.getOneQuote(+id);
  }

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    return this.quotesService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.delete(+id);
  }
}
