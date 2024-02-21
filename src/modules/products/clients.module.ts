import { Module } from '@nestjs/common'
import { ClientController } from './http/controllers/client.controller'
import { ClientService } from './domain/services/clients.service'
import { ClientRepository } from './domain/interfaces/client.repository.interface'
import { ClientPrismaRepository } from './repositories/client.prisma.repository'
import { PersistenceModule } from '@src/shared/modules/persistence/persistence.module'

@Module({
  imports: [PersistenceModule],
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: ClientRepository,
      useClass: ClientPrismaRepository
    }
  ],
  exports: [ClientService]
})
export class ClientModule {}
