import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { updateOne } from "../../core/utils/crudUtils";
import { Device } from "../types/device";

const updateDevice = async (device: Device): Promise<Device> => {
  const { data } = await axios.put("/api/devices", device);
  return data;
};

export function useUpdateDevice() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(updateDevice, {
    onSuccess: (device: Device) => {
      queryClient.setQueryData<Device[]>(["devices"], (oldDevices) =>
        updateOne(oldDevices, device)
      );
    },
  });

  return { isUpdating: isLoading, updateDevice: mutateAsync };
}
