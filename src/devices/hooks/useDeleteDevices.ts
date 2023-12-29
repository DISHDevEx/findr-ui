import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { removeMany } from "../../core/utils/crudUtilsDevice";
import { Device } from "../types/device";

const deleteDevices = async (deviceIds: string[]): Promise<string[]> => {
  const { data } = await axios.delete("/api/devices", { data: deviceIds });
  return data;
};

export function useDeleteDevices() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(deleteDevices, {
    onSuccess: (deviceIds: string[]) => {
      queryClient.setQueryData<Device[]>(["devices"], (oldDevices) =>
        removeMany(oldDevices, deviceIds)
      );
    },
  });

  return { isDeleting: isLoading, deleteDevices: mutateAsync };
}
