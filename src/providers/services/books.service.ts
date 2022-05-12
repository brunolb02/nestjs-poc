import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookInput } from 'src/dto/books';
import { BookRepository } from '../repositories';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getBooks() {
    try {
      return this.bookRepository.findAll();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async createBook(input: CreateBookInput) {
    const findBookByName = await this.bookRepository.findByUnique({
      name: input.name,
    });

    if (findBookByName) throw new ConflictException('Book already exists');

    try {
      return this.bookRepository.create(input);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async updateBookAmount(newAmount: number, id: string) {
    const findBookById = await this.bookRepository.findByUnique({
      id,
    });

    if (!findBookById) throw new NotFoundException('Book not found');

    try {
      return this.bookRepository.update(
        {
          amount: newAmount,
        },
        id,
      );
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
