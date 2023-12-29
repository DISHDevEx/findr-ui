import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtils";
import { Device } from "../types/device";
import { mock } from "../../mocks/server";

const registerDevice = async (device: Device): Promise<Device> => {
  mock.restore();
  const { data } = await axios.post("http://afd0e01f0d9594dc5adbd0350e4454c7-1214440607.us-east-1.elb.amazonaws.com:9000/oracle", device);
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
