import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/config/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { ComplexityPlugin, LoggerPlugin } from './common/plugin';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    UserModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [ComplexityPlugin, LoggerPlugin],
})
export class AppModule {}
