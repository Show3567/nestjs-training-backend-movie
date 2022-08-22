import { Controller, Get, Sse } from '@nestjs/common';
import { interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((num) => {
        return { data: { hello: `world ${num}` } } as MessageEvent;
      }),
      take(10),
    );
  }
}
