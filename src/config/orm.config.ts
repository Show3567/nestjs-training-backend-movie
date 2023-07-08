import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'databaseConfig',
  async (): Promise<TypeOrmModuleOptions> => ({
    type: 'mongodb',
    url: new ConfigService().get('MODB_URL'),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoLoadEntities: true,
    synchronize: true,
  }),
);
