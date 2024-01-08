import axios from "axios";
import { useQuery } from "react-query";
import { Device } from "../types/device";

const fetchDevices = async (): Promise<Device[]> => {
  const { data } = await axios.get("/api/devices");
  return data;
};

export function useDevices() {
  return useQuery("devices", () => fetchDevices());
}
