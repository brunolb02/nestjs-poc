/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  yupCreateBookInput,
  yupUpdateBookAmountInput,
} from 'src/providers/helpers/yup/books';
import { BookService } from 'src/providers/services/books.service';
import { CreateBookInput, UpdateBookAmountInput } from 'src/dto/books';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/books')
  async getBooks() {
    return this.bookService.getBooks();
  }

  @Post('/books')
  async createBook(@Body() input: CreateBookInput) {
    const isValidInput = yupCreateBookInput.isValidSync(input);

    if (!isValidInput) throw new BadRequestException('Invalid input');

    return this.bookService.createBook(input);
  }

  @Put('/books/amount/:id')
  async updateBookAmount(
    @Body() input: UpdateBookAmountInput,
    @Param() params,
  ) {
    const isValidInput = yupUpdateBookAmountInput.isValidSync(input);

    if (!isValidInput)
      throw new BadRequestException('Amount field is required');

    return this.bookService.updateBookAmount(input.amount, params.id);
  }
}
