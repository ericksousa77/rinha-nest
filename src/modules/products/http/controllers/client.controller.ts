import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Post
} from '@nestjs/common'

import { GetUserBankAccountStatementInputDto } from '@src/modules/products/http/dtos/statement/show-statement-dto'

import { ClientService } from '../../domain/services/clients.service'

@Controller('clientes')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':clientId/extrato') // route HTTP method definition
  @HttpCode(HttpStatus.OK)
  /* function */
  async generateBankAccountStatement(
    @Param() pathParams: GetUserBankAccountStatementInputDto
  ): Promise<any> {
    return this.clientService.generateBankAccountStatement(
      Number(pathParams.clientId)
    )
  }

  @Post(':clientId/transacoes') // route HTTP method definition
  @HttpCode(HttpStatus.OK)
  async updateClientBalance(
    @Param() params: any,
    @Body() transactionData: any
  ): Promise<any> {
    return this.clientService.updateClientBalance(
      Number(params.clientId),
      transactionData.tipo,
      Number(transactionData.valor),
      transactionData.descricao
    )
  }
}
