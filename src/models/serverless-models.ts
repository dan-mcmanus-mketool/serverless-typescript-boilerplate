type awsLogGroupProps = {
  RetentionInDays: number,
  KMSKeyId: 'arn:aws:kms:${aws:region}:${aws:accountId}:alias/DataPlatform-Generic'
}
export type functionLogGroupConfiguration = {
  Type: 'AWS::Logs::LogGroup',
  Properties: awsLogGroupProps
}
