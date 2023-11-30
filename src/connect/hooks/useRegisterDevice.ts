import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtils";
import { Device } from "../types/device";

const registerDevice = async (device: Device): Promise<Device> => {
  const { data } = await axios.post("http://findr-alb-1636228672.us-east-1.elb.amazonaws.com/trigger-adapters", device);
  return data;
};

export function useRegisterDevice() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(registerDevice, {
    onSuccess: (device: Device) => {
      queryClient.setQueryData<Device[]>(["devices"], (oldDevices) =>
        addOne(oldDevices, device)
      );
    },
  });

  return { isAdding: isLoading, registerDevice: mutateAsync };
}
