export interface Device {
  id: string;
  avatar?: string;
  disabled: boolean;
  macAddress: string;
  firstName: string;
  upConnector?: "S3" | "DynamoDB" | "Blob Store";
  lastName: string;
  deviceType: string;
}
