import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtilsDevice";
import { Device } from "../types/device";
import { mock } from "../../mocks/server";

const registerDevice = async (device: Device): Promise<Device> => {
  mock.restore();
  const { data } = await axios.post("http://a193a59270f054632b122812df0d5ac3-1193284028.us-east-1.elb.amazonaws.com:9000/oracle", device);
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
