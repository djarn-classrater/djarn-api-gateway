import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class SearchService {
  constructor(@Inject('SEARCH_SERVICE') private serachClient: ClientProxy) {}

  async ping() {
    return this.serachClient.send('ping', {}).toPromise()
  }
}
