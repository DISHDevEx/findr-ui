export interface Device {
  deviceId: string;
  destination: "s3" | "dynamodb" | "Blob Store";
  source: "mqtts" | "http";
  mqttsBroker: string;
  topic: string;
  clientId: string;
  httpPortNumber: string;
  httpRoute: string;
  s3BucketName: string;
  s3Region: string;
  s3FileKey: string;
  dynamoDBTableName: string;
  dynamoDBRegion: string;
}