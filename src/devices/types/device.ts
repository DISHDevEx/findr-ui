export interface Device {
  id: string;
  avatar?: string;
  disabled: boolean;
  localFilePath: string;
  deviceName: string;
  destination?: "S3" | "DynamoDB" | "Blob Store";
  deviceTemplate: string;
  deviceType: string;
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
