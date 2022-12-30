export default {
  type: 'object',
  properties: {
    quequeryStringParameters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      },
      required: ['name', 'age']
    }
  },
  required: ['queryStringParameters'],
} as const;
