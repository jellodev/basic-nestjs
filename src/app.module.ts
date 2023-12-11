import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/config/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/Logger.middleware';
import { ComplexityPlugin } from './common/plugin/complecity.plugin';

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
  providers: [ComplexityPlugin],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/graphql');
  }
}
