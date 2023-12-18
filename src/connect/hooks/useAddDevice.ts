import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtils";
import { Device } from "../types/device";

const findrapi = axios.create({
  baseURL: 'http://findr-alb-1636228672.us-east-1.elb.amazonaws.com',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

const addDevice = async (device: Device): Promise<Device> => {
  const { data } = await findrapi.post("/findr-backend", device);
  return data;
};

export function useAddDevice() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(addDevice, {
    onSuccess: (device: Device) => {
      queryClient.setQueryData<Device[]>(["devices"], (oldDevices) =>
        addOne(oldDevices, device)
      );
    },
  });

  return { isAdding: isLoading, addDevice: mutateAsync };
}
