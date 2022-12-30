import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';

describe('Get Handler', () => {
  it('should pass with mocked get request', async () => {
    const event: any = {
      headers: { 'Content-Type': 'application/json' },
      body: '{"name": "Frederic", "age": 40}',
    };
    const context = {} as Context;
    const callback = null as Callback;

    const response = await handler(event, context, callback);
    console.log(response);
    expect(response).toMatchObject({
      body:
        '{"message":"Hello Frederic, welcome to the exciting Serverless world!","event":{"headers":{"Content-Type":"application/json"},"body":{"name":"Frederic"}}}',
      statusCode: 200,
    });
  });
});
