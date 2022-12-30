import 'source-map-support/register';

import { formatJSONResponse, ValidatedEventAPIGatewayProxyGetEvent } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';

import schema from './schema';
const get: ValidatedEventAPIGatewayProxyGetEvent<typeof schema> = async (event) => {
  return formatJSONResponse(event.queryStringParameters);
};

export const main = middyfy(get);
