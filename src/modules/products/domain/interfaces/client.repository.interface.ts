import { Prisma, TRANSACTION_TYPE, clients as Client } from '@prisma/client'

export abstract class ClientRepository {
  abstract findLastTenTransactionsByUser(
    clientId: number,
    transaction?: Prisma.TransactionClient
  ): Promise<Client>

  abstract findClientById(
    clientId: number,
    transaction?: Prisma.TransactionClient
  ): Promise<Client>

  abstract updateUserBalance(
    clientId: number,
    newBalance: number,
    transactionType: TRANSACTION_TYPE,
    transactionValue: number,
    transactionDescription: string,
    transaction?: Prisma.TransactionClient
  ): Promise<Client>
}
