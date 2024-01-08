import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useState }from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import SvgContainer from "../../core/components/SvgContainer";
import { ReactComponent as S3Svg } from "../assets/amazon-s3.svg";
import { ReactComponent as DynamoSvg } from "../assets/aws-dynamodb.svg";
import { useAddDevice } from "../hooks/useAddDevice";
import { useDeleteDevices } from "../hooks/useDeleteDevices";
import { useUpdateDevice } from "../hooks/useUpdateDevice";
import { useDevices } from "../hooks/useDevices";
import { Device } from "../types/device";
import DeviceForm from "../components/DeviceForm";
import Tooltip from '@mui/material/Tooltip';

const DeviceRegistration = () => {
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
            device: `${device.deviceId}`,
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
            device: `${device.deviceId} ${device.destination}`,
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
      <Typography
              component="div"
              variant="h2"
            >{`Connect`}</Typography>
        <Grid item xs={12} md={12} marginTop={3}>
          <Box sx={{ mb: 4 }}>
            <DeviceForm
            onAdd={handleAddDevice}
            onClose={handleCloseDeviceDialog}
            onUpdate={handleUpdateDevice}
            open={openDeviceDialog}
            processing={processing}
            device={deviceUpdated}
            />
          </Box>
          <QueryWrapper>
            <Outlet />
          </QueryWrapper>
        </Grid>
    </React.Fragment>
  );
};

export default DeviceRegistration;
