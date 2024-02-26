import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // @Cron('45 * * * * *')
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'test every 30sec',
    timeZone: 'America/Chicago',
  })
  handleCron() {
    this.logger.debug('Called every 10sec');
    console.log('hello by 5 sec');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
