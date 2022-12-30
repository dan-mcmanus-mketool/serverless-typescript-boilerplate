import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema, JSONSchema7 } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyGetEvent<S extends JSONSchema7> = Omit<APIGatewayProxyEvent, 'queryStringParameters' | 'body'> & {
  queryStringParameters: FromSchema<S>,
  body: string
}

type ValidatedAPIGatewayProxyEvent<S extends JSONSchema7> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};

export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema7> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;
export type ValidatedEventAPIGatewayProxyGetEvent<S extends JSONSchema7> = Handler<
ValidatedAPIGatewayProxyGetEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
};

export type APIResponse = {
  statusCode: number | undefined;
  headers: Record<string, unknown> | undefined;
  body: string | undefined;
}

export class API {
  private apiResponse: APIResponse;
  formatJSONBody = (response: Record<string, unknown>) => {
    response.body = JSON.stringify(response);
    return this;
  };
  withStatusCode = (statusCode: number = 200) => {
    this.apiResponse.statusCode = statusCode;
    return this;
  }
  withHeaders = (headers: Record<string, string>) => {
    this.apiResponse.headers ??= headers;
    return this;
  }
  build = () => {
    return this.apiResponse;
  }
}

