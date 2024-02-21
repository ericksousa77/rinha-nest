import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { ClientRepository } from '../interfaces/client.repository.interface'
import { PrismaService } from '@src/shared/modules/persistence/prisma.service'

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly prismaService: PrismaService
  ) {}

  async generateBankAccountStatement(clientId: number): Promise<any> {
    const bankAccountStatementData =
      await this.clientRepository.findLastTenTransactionsByUser(clientId)

    return this.parseBankAccountStatementInformations(bankAccountStatementData)
  }

  parseBankAccountStatementInformations(bankAccountStatementData: any) {
    const saldo = {
      total: Number(bankAccountStatementData.balance),
      data_extrato: new Date(),
      limite: bankAccountStatementData.limit
    }

    const ultimas_transacoes = bankAccountStatementData.transactions?.map(
      (transaction: any) => ({
        valor: Number(transaction.amount),
        tipo: transaction.type === 'debit' ? 'd' : 'c',
        descricao: transaction.description,
        realizada_em: transaction.created_at
      })
    )

    return {
      saldo,
      ultimas_transacoes
    }
  }

  async updateClientBalance(
    clientId: number,
    transactionType: string,
    transactionValue: number,
    transactionDescription: string
  ): Promise<any> {
    return this.prismaService.$transaction(async (tx) => {
      if (
        !transactionValue ||
        transactionValue <= 0 ||
        !Number.isInteger(transactionValue) ||
        !['c', 'd'].includes(transactionType) ||
        !transactionDescription ||
        transactionDescription?.length > 10 ||
        transactionDescription?.length < 1
      ) {
        throw new UnprocessableEntityException('inconsistent transaction data')
      }

      const [client] =
        await tx.$queryRaw<any>`SELECT * FROM clients WHERE id = ${clientId} FOR UPDATE;`

      const newBalance =
        Number(client.balance) +
        (transactionType === 'c'
          ? Number(transactionValue)
          : -Number(transactionValue))

      if (newBalance < -client.limit) {
        throw new UnprocessableEntityException('inconsistent balance')
      }

      const transactionTypeCompleteName =
        transactionType === 'c' ? 'credit' : 'debit'

      const updatedClient = await this.clientRepository.updateUserBalance(
        clientId,
        newBalance,
        transactionTypeCompleteName,
        transactionValue,
        transactionDescription,
        tx
      )

      return {
        limite: client.limit,
        saldo: updatedClient.balance
      }
    })
  }
}
