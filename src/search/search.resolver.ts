import { Resolver, Query } from '@nestjs/graphql'
import { SearchService } from './search.service'

@Resolver('Search')
export class SearchResolver {
  constructor(private searchService: SearchService) {}
}
