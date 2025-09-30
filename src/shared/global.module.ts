import { Global, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CustomExceptionsFilters } from "./filters/CustomExceptionsFilters";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionsFilters
    }
  ],
  exports: [],
})
export class GlobalModule {}



