import { RESTDataSource } from 'apollo-datasource-rest'
import { Injectable } from '@nestjs/common'
import { UserType } from './users.dto'
import { clean, IFilter } from '../utils/clean'

@Injectable()
export class UsersAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.USER_HOST
  }

  async getUsers(filter?: IFilter): Promise<UserType[]> {
    return this.get('users', clean(filter))
  }

  async getUser(id): Promise<UserType> {
    return this.get(`users/${id}`)
  }
}
