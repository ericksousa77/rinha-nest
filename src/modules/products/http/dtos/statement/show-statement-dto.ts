import { Transform } from 'class-transformer'
import { IsNumber, IsPositive } from 'class-validator'

export class GetUserBankAccountStatementInputDto {
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsNumber()
  clientId: number
}
