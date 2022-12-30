import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type { functionLogGroupConfiguration } from '../models/serverless-models';

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};

export const createFunctionLogGroup = (retentionDays = 7): functionLogGroupConfiguration => {
  return {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      RetentionInDays: retentionDays,
      KMSKeyId: 'arn:aws:kms:${aws:region}:${aws:accountId}:alias/DataPlatform-Generic'
    }
  }
}
