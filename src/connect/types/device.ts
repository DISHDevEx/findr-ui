export interface Device {
  deviceId: string;
  destination: "s3" | "dynamodb" | "Blob Store";
  source: "mqtts" | "http";
  mqttsBroker: string;
  topic: string;
  clientId: string;
  httpPortNumber: string;
  httpRoute: string;
  httpIp: string;
  httpResponseKey: string;
  httpRequestInterval: string;
  s3BucketName: string;
  s3Region: string;
  s3FileKey: string;
  dynamodbTableName: string;
  dynamodbRegion: string;
  certificate: string;
}