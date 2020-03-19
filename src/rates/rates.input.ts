import { Field, InputType, ArgsType, ID } from 'type-graphql'
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

@InputType()
class UpdateRateInput implements Partial<RateType> {
  @Field()
  @IsNumber()
  readonly rating: number
}

@ArgsType()
export class UpdateRateArgs {
  @Field(() => ID)
  @IsNotEmpty()
  readonly id: number

  @Field(() => UpdateRateInput)
  readonly rate: UpdateRateInput
}
