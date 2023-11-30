export interface Device {
  id: string;
  localFilePath: string;
  deviceName: string;
  destination?: "s3" | "dynamodb" | "Blob Store";
  source?: "mqtts" | "http";
  // deviceTemplate: string;
  // deviceType: string;
  mqttsBroker: string;
  topic: string;
  clientID: string;
  caFilePath: string;
  httpPortNumber: string;
  httpRoute: string;
  s3Bucket: string;
  s3Region: string;
  s3FileKey: string;
  dynamoDBTableName: string;
  dynamoDBRegion: string;


}