import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { SearchPayload, CourseResponse } from './search.dto'

@Injectable()
export class SearchService {
  constructor(@Inject('SEARCH_SERVICE') private serachClient: ClientProxy) {}

  async ping() {
    return this.serachClient.send('ping', {}).toPromise()
  }

  async search(payload: SearchPayload): Promise<CourseResponse[]> {
    return this.serachClient.send('search.query', payload).toPromise()
  }
}
