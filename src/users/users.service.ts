import { RESTDataSource } from 'apollo-datasource-rest'
import { Injectable } from '@nestjs/common'
import _ from 'lodash'
import { UserType } from './users.dto'

@Injectable()
export class UsersAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.USER_HOST
  }

  clean(obj) {
    return _.pickBy(obj, _.identity)
  }

  async getUsers(filter?): Promise<UserType[]> {
    return this.get('users', this.clean(filter))
  }

  async getUser(id): Promise<UserType> {
    return this.get(`users/${id}`)
  }
}
