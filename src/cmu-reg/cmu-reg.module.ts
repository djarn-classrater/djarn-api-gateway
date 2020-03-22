import { Module, HttpModule } from '@nestjs/common'
import { CMURegService } from './cmu-reg.service'
import { CMURegResolver } from './cmu-reg.resolver'

@Module({
  imports: [HttpModule],
  providers: [CMURegService, CMURegResolver],
})
export class CMURegModule {}
