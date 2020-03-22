import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { TContext } from '../app.module'
import { StudentInfo } from './cmu-reg.dto'

export const User = createParamDecorator<
  never,
  ExecutionContext,
  Promise<StudentInfo>
>(async (_, ctx) => {
  const { req, cmuRegService } = GqlExecutionContext.create(ctx).getContext<
    TContext
  >()
  const studentInfo = await cmuRegService.getStudentInfo(req)
  return studentInfo
})
