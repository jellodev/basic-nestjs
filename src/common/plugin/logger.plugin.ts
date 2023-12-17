import { Logger, Request } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggerPlugin implements ApolloServerPlugin {
  private static getTime() {
    return new Date().getTime();
  }

  async requestDidStart(@Request() request): Promise<GraphQLRequestListener> {
    if (request.request?.operationName === 'IntrospectionQuery') {
      return;
    }
    const traceId = request.context?.req?.headers?.['trace-id'] ?? uuidV4();
    const info = {
      query: request?.request?.query?.replace(/[\s\t\r\n]+/g, ' '),
      variables: request?.request?.variables,
    };
    const startTime = LoggerPlugin.getTime();

    Logger.log(`Request started`, `${traceId}::Request`);
    Logger.debug(JSON.stringify(info), `${traceId}::Data`);
    return {
      async didEncounterErrors(request) {
        Logger.error(JSON.stringify(request.errors), `${traceId}::Error`);
      },
      async willSendResponse() {
        const endTime = LoggerPlugin.getTime();
        Logger.log(
          `Will send response (duration: ${endTime - startTime}ms)`,
          `${traceId}::Response`,
        );
      },
    };
  }
}
