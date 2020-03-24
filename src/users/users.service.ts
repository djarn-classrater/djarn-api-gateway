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

  /**
   *
   * @param id - Index of primary key in users database
   * @returns User information
   */
  async getUser(id: number): Promise<UserType>

  /**
   * @warn This method doesn't throw 404 when user not found
   *
   * @param studentId - Student id in CMU registration
   * @returns User information or undefined
   */
  async getUser(studentId: string): Promise<UserType>

  async getUser(idOrStudentId: number | string): Promise<UserType> {
    switch (typeof idOrStudentId) {
      case 'number':
        return this.get(`users/${idOrStudentId}`)
      case 'string':
        const users = await this.get('users', { studentId: idOrStudentId })
        return users[0]
    }
  }

  async createUser(user: UserType): Promise<UserType> {
    return this.post('users', { ...user })
  }
}
