import { Prisma, TRANSACTION_TYPE } from '@prisma/client'

export abstract class ClientRepository {
  abstract findLastTenTransactionsByUser(
    clientId: number,
    transaction?: Prisma.TransactionClient
  ): Promise<any>

  abstract findClientById(
    clientId: number,
    transaction?: Prisma.TransactionClient
  ): Promise<any>

  abstract incrementUserBalance(
    clientId: number,
    transactionType: TRANSACTION_TYPE,
    transactionValue: number,
    transactionDescription: string,
    transaction?: Prisma.TransactionClient
  ): Promise<any>

  abstract decrementUserBalance(
    clientId: number,
    transactionType: TRANSACTION_TYPE,
    transactionValue: number,
    transactionDescription: string,
    transaction?: Prisma.TransactionClient
  ): Promise<any>

  abstract updateUserBalance(
    clientId: number,
    newBalance: number,
    transactionType: TRANSACTION_TYPE,
    transactionValue: number,
    transactionDescription: string,
    transaction?: Prisma.TransactionClient
  ): Promise<any>
}
