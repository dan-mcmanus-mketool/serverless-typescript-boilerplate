/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';
import helloSchema  from './src/functions/hello/schema';
import { createFunctionLogGroup } from './src/libs/lambda';

const serverlessConfiguration: AWS = {
  service: 'serverless-typescript-template',
  frameworkVersion: '3',
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: false
    },
    stage: 'dev',
    stages: ['dev', 'test'],
    prune: {
      automatic: true,
      number: 3,
    },
    alerts: {
      dashboards: true,
      definitions: {
        '5XXErrors': {
          name: '5XXErrors',
          namespace: 'AWS/ApiGateway',
          metric: '5XXError',
          omitDefaultDimension: true,
          dimensions: [
            {
              Name: 'ApiName',
              Value: '${self:service}-${self:custom.stage}',
            },
            {
              Name: 'Stage',
              Value: '${self:custom.stage}',
            },
          ],
          threshold: 5,
          statistic: 'Sum',
          period: 60,
          evaluationPeriods: 1,
          datapointsToAlarm: 1,
          comparisonOperator: 'GreaterThanOrEqualToThreshold',
        },
      },
      alarms: ['functionThrottles', 'functionErrors', '5XXErrors'],
    },
  },
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
    'serverless-plugin-aws-alerts',
  ],
  package: {
    individually: true
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    architecture: 'arm64',
    memorySize: 128,
    timeout: 15,
    deploymentBucket: 'jedi-test.resources.us-east-1',
    tracing: {
      lambda: true,
      apiGateway: true
    },
    iam: {
      role: {
        // managedPolicies: [
        //   'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        //   'arn:aws:iam::aws:policy/CloudWatchLambdaInsightsExecutionRolePolicy'
        // ],
        statements: [
          {
            Effect: 'Allow',
            Action: [
              "dynamodb:UpdateItem"
            ],
            //Resource: 'arn:aws:dynamodb:${aws:region}:${aws:accountId}:table/manufacturing-tool-record',
            Resource: 'arn:aws:dynamodb:${aws:region}:158847413269:table/manufacturing-tool-record', // limiting to sandbox using account id
          },
        ]
      },
    },

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: true, // activate to see CacheHits and Misses
    },
    logs: {
      // activate to see API Gateway logs
      restApi: {
        accessLogging: false,
        executionLogging: false,
        level: 'INFO',
        fullExecutionData: false,
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    GetHandler: {
      handler: 'src/functions/get/handler.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'user',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true,
                  age: true
                }
              }
            }
          },
        },
      ],
    },
    HelloHandler: {
      handler: 'src/functions/hello/handler.main',
      events: [{
        http: {
          method: 'post',
          path: 'hello',
          request: {
            schemas: {
              'application/json': helloSchema,
            },
          },
        },
      }]
    },
  },
  resources: {
    Resources: {
      GetHandlerLogGroup: createFunctionLogGroup(),
      HelloHandlerLogGroup: createFunctionLogGroup()
    }
  }
}

module.exports = serverlessConfiguration;
