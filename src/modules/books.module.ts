import { Module } from '@nestjs/common';
import { BookController } from 'src/controllers/books.controller';
import { BookRepository } from 'src/providers/repositories';
import { BookService } from 'src/providers/services/books.service';

@Module({
  controllers: [BookController],
  providers: [BookRepository, BookService],
})
export class BookModule {}
