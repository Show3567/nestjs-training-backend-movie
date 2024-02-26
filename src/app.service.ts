import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // @Cron('45 * * * * *')
  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'test every 30sec',
    timeZone: 'America/Chicago',
  })
  handleCron() {
    this.logger.debug('Called every 10sec');
  }

  getHello(): string {
    return 'Hello World! Hi!';
  }
}
