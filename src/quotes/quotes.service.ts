import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entity/quote.entity';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  async getAllQuotes(): Promise<Quote[]> {
    return this.quoteRepository.find();
  }

  async getOneQuote(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with id ${id} not found`);
    }
    return quote;
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = await this.quoteRepository.find();
    if (quotes.length === 0) {
      throw new NotFoundException('No quotes available');
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const newQuote = this.quoteRepository.create(createQuoteDto);
    return this.quoteRepository.save(newQuote);
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.getOneQuote(id);
    const updated = { ...quote, updateQuoteDto };
    return this.quoteRepository.save(updated);
  }

  async delete(id: number): Promise<Quote> {
    const quote = await this.getOneQuote(id);
    await this.quoteRepository.remove(quote);
    return quote;
  }
}
