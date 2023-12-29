import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtils";
import { Device } from "../types/device";
import { mock } from "../../mocks/server";

const findrapi = axios.create({
  baseURL: "http://afd0e01f0d9594dc5adbd0350e4454c7-1214440607.us-east-1.elb.amazonaws.com/oracle",
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

const addDevice = async (device: Device): Promise<Device> => {
  mock.restore();
  const { data } = await findrapi.post("", device);
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
