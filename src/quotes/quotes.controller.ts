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
import type { Quote } from 'src/interface/Quote';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async getAllQuotes(): Promise<Quote[]> {
    return this.quotesService.getAllQuotes();
  }

  @Get('random')
  async getRandomQuote(): Promise<Quote> {
    return this.quotesService.getRandomQuote();
  }

  @Get(':id')
  async getOneQuote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.getOneQuote(+id);
  }

  @Post()
  async create(@Body() quote: Omit<Quote, 'id'>) {
    return this.quotesService.create(quote);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() quoteUpdate: Partial<Quote>) {
    return this.quotesService.update(+id, quoteUpdate);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.delete(+id);
  }
}
