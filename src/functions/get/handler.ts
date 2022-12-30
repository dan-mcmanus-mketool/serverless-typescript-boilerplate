import 'source-map-support/register';

import { ValidatedEventAPIGatewayProxyGetEvent } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';

import schema from './schema';
import { formatJSONResponse } from '../../libs/apiGateway';
const get: ValidatedEventAPIGatewayProxyGetEvent<typeof schema> = async (event) => {
  console.log(event);
  return formatJSONResponse({
    params: {...event.queryStringParameters}
  })
};

export const main = middyfy(get);
