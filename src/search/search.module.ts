import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SearchService } from './search.service'
import { SearchResolver } from './search.resolver'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SEARCH_HOST,
          port: +process.env.SEARCH_PORT,
        },
      },
    ]),
  ],
  providers: [SearchService, SearchResolver],
})
export class SearchModule {}
