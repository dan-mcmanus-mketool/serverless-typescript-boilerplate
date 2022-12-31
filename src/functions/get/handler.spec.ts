import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
const event = require('./mock.json');
describe('Get Handler', () => {
  it('should pass with mocked get request', async () => {
    const context = {} as Context;
    const callback = null as Callback;

    const response = await handler(event, context, callback);
    console.log(response);
    expect(response).toEqual({ statusCode: 200, body: '{"name":"dan","age":40}' })
  });
});
