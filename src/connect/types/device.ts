export interface Device {
  //id: string;
  // localFilePath: string;
  deviceName: string;
  destination?: "s3" | "dynamodb" | "Blob Store";
  source?: "mqtts" | "http";
  // deviceTemplate: string;
  // deviceType: string;
  mqttsBroker: string;
  topic: string;
  clientId: string;
  // caFilePath: string;
  httpPortNumber: string;
  httpRoute: string;
  s3BucketName: string;
  s3Region: string;
  s3FileKey: string;
  dynamoDBTableName: string;
  dynamoDBRegion: string;
}