import { Module } from '@nestjs/common';

import { PaginationProvider } from './provider/pagination';

@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
