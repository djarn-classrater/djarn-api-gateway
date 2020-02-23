import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './*/*.gql'
    }),
    PingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
