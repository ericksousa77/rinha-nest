import { Injectable } from '@nestjs/common'

import { PrismaService } from '@src/shared/modules/persistence/prisma.service'

import { ClientRepository } from '../domain/interfaces/client.repository.interface'
import { Prisma, TRANSACTION_TYPE, clients as Client } from '@prisma/client'

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
  private repository

  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.clients
  }

  async findLastTenTransactionsByUser(
    clientId: number,
    transaction?: Prisma.TransactionClient
  ): Promise<Client> {
    const repository =
      transaction && transaction instanceof PrismaService
        ? transaction.clients
        : this.repository

    return repository.findUniqueOrThrow({
      where: {
        id: clientId
      },
      include: {
        transactions: {
          where: {
            client_id: clientId
          },
          take: 10,
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    })
  }

  async findClientById(
    clientId: number,
    transaction?: Prisma.TransactionClient
  ): Promise<Client> {
    const repository =
      transaction && transaction instanceof PrismaService
        ? transaction.clients
        : this.repository

    return repository.findUniqueOrThrow({
      where: {
        id: clientId
      }
    })
  }

  async updateUserBalance(
    clientId: number,
    newBalance: number,
    transactionType: TRANSACTION_TYPE,
    transactionValue: number,
    transactionDescription: string,
    transaction?: Prisma.TransactionClient
  ): Promise<Client> {
    const repository =
      transaction && transaction instanceof PrismaService
        ? transaction.clients
        : this.repository

    return repository.update({
      where: {
        id: clientId
      },
      data: {
        balance: newBalance,
        transactions: {
          create: {
            description: transactionDescription,
            amount: transactionValue,
            type: transactionType
          }
        }
      }
    })
  }
}
