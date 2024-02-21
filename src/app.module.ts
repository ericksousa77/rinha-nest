import { Module } from '@nestjs/common'

import { ClientModule } from './modules/products/clients.module'

@Module({
  imports: [ClientModule]
})
export class AppModule {}
