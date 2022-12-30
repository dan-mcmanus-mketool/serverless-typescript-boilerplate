import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
describe('Get Handler', () => {
  it('should pass with mocked get request', async () => {
    const event: any = {}
    const context = {} as Context;
    const callback = null as Callback;

    const response = await handler(event, context, callback);
    console.log(response);
    expect(response).toEqual({
      queryStringParameters: {
        name: 'Fredric',
        age: 40
      },
      statusCode: 200,
    });
  });
});
