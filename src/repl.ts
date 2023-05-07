import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();

/* 
  $ npm run start -- --entryFile repl
  ## OR yarn start --entryFile repl
*/
