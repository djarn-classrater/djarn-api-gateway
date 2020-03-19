import { Module } from '@nestjs/common'
import { RatesAPI } from './rates.service'
import { RatesResolver } from './rates.resolver'

@Module({
  providers: [RatesAPI, RatesResolver],
})
export class RatesModule {}
