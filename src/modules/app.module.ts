import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../providers/services/app.service';
import { BookModule } from './books.module';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
