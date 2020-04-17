import { Field, InputType, ArgsType, Int } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { RateType } from './rates.dto'

@InputType()
export class RateInput implements Partial<RateType> {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly courseId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  readonly rating: number
}

@ArgsType()
export class UpdateRateArgs {
  @Field(() => Int)
  @IsNotEmpty()
  readonly id: number

  @Field(() => Int)
  readonly rate: number
}
