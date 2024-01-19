import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtilsDevice";
import { Device } from "../types/device";

const addDevice = async (device: Device): Promise<Device> => {
  const { data } = await axios.post("/api/devices", device);
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
