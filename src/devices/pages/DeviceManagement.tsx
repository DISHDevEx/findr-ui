import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import ConfirmDialog from "../../core/components/ConfirmDialog";
import SelectToolbar from "../../core/components/SelectToolbar";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import DeviceDialog from "../components/DeviceDialog";
import DeviceTable from "../components/DeviceTable";
import { useAddDevice } from "../hooks/useAddDevice";
import { useDeleteDevices } from "../hooks/useDeleteDevices";
import { useUpdateDevice } from "../hooks/useUpdateDevice";
import { useDevices } from "../hooks/useDevices";
import { Device } from "../types/device";

const DeviceManagement = () => {
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [deviceDeleted, setDeviceDeleted] = useState<string[]>([]);
  const [deviceUpdated, setDeviceUpdated] = useState<Device | undefined>(undefined);

  const { addDevice, isAdding } = useAddDevice();
  const { deleteDevices, isDeleting } = useDeleteDevices();
  const { isUpdating, updateDevice } = useUpdateDevice();
  const { data } = useDevices();

  const processing = isAdding || isDeleting || isUpdating;

  const handleAddDevice = async (device: Partial<Device>) => {
    addDevice(device as Device)
      .then(() => {
        snackbar.success(
          t("DeviceManagement.notifications.addSuccess", {
            device: `${device.firstName} ${device.deviceTemplate}`,
          })
        );
        setOpenDeviceDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleDeleteDevices = async () => {
    deleteDevices(deviceDeleted)
      .then(() => {
        snackbar.success(t("DeviceManagement.notifications.deleteSuccess"));
        setSelected([]);
        setDeviceDeleted([]);
        setOpenConfirmDeleteDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleUpdateDevice = async (device: Device) => {
    updateDevice(device)
      .then(() => {
        snackbar.success(
          t("DeviceManagement.notifications.updateSuccess", {
            device: `${device.firstName} ${device.deviceTemplate}`,
          })
        );
        setOpenDeviceDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseDeviceDialog = () => {
    setDeviceUpdated(undefined);
    setOpenDeviceDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (deviceIds: string[]) => {
    setDeviceDeleted(deviceIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenDeviceDialog = (device?: Device) => {
    setDeviceUpdated(device);
    setOpenDeviceDialog(true);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        {!selected.length ? (
          <AdminToolbar title={t("deviceManagement.toolbar.title")}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenDeviceDialog()}
              size="small"
            >
              <AddIcon />
            </Fab>
          </AdminToolbar>
        ) : (
          <SelectToolbar
            processing={processing}
            onCancel={handleCancelSelected}
            onDelete={handleOpenConfirmDeleteDialog}
            selected={selected}
          />
        )}
      </AdminAppBar>
      <DeviceTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenDeviceDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        devices={data}
      />
      <ConfirmDialog
        description={t("deviceManagement.confirmations.delete")}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteDevices}
        open={openConfirmDeleteDialog}
        title={t("common.confirmation")}
      />
      {openDeviceDialog && (
        <DeviceDialog
          onAdd={handleAddDevice}
          onClose={handleCloseDeviceDialog}
          onUpdate={handleUpdateDevice}
          open={openDeviceDialog}
          processing={processing}
          device={deviceUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default DeviceManagement;
