import 'source-map-support/register';

import { formatJSONResponse, ValidatedEventAPIGatewayProxyGetEvent } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';
import schema from './schema';

const get: ValidatedEventAPIGatewayProxyGetEvent<typeof schema> = async (event) => {
  console.log(event);
  const { queryStringParameters } = event;
  return formatJSONResponse({
    name: queryStringParameters.name,
    age: queryStringParameters.age
  })
};

export const main = middyfy(get);
