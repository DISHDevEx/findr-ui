import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import React, { useState } from 'react';
import { Device } from "../types/device";

const upConnectors = [
  { label: "deviceManagement.form.upConnector.options.s", value: "S3" },
  { label: "deviceManagement.form.upConnector.options.d", value: "Dynamo DB" },
  { label: "deviceManagement.form.upConnector.options.b", value: "Blob Store" },
];

const downConnectors = [
  { label: "deviceManagement.form.downConnector.options.h", value: "HTTP" },
  { label: "deviceManagement.form.downConnector.options.m", value: "MQTT" },
];

const deviceTypes = ["Sensor", "Camera"];

type DeviceDialogProps = {
  onAdd: (device: Partial<Device>) => void;
  onClose: () => void;
  onUpdate: (device: Device) => void;
  open: boolean;
  processing: boolean;
  device?: Device;
};

const DeviceDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  device,
}: DeviceDialogProps) => {
  const { t } = useTranslation();

  const editMode = Boolean(device && device.id);

  const handleSubmit = (values: Partial<Device>) => {
    if (device && device.id) {
      onUpdate({ ...values, id: device.id } as Device);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      disabled: device ? device.disabled : false,
      localFilePath: device ? device.localFilePath : "",
      firstName: device ? device.firstName : "",
      upConnector: device ? device.upConnector : "S3",
      deviceTemplate: device ? device.deviceTemplate : "",
      deviceType: device ? device.deviceType : "",
    },
    validationSchema: Yup.object({
      localFilePath: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      firstName: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      deviceTemplate: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      deviceType: Yup.string().required(t("common.validations.required")),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="device-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="device-dialog-title">
          {editMode
            ? t("deviceManagement.modal.edit.title")
            : t("deviceManagement.modal.add.title")}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="deviceTemplate"
            label={t("deviceManagement.form.deviceTemplate.label")}
            name="deviceTemplate"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.deviceTemplate}
            onChange={formik.handleChange}
            error={formik.touched.deviceTemplate && Boolean(formik.errors.deviceTemplate)}
            helperText={formik.touched.deviceTemplate && formik.errors.deviceTemplate}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={t("deviceManagement.form.firstName.label")}
            name="firstName"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              {t("deviceManagement.form.downConnector.label")}
            </FormLabel>
            <RadioGroup
              row
              aria-label="downConnector"
              name="downConnector"
              value={formik.values.downConnector}
              onChange={formik.handleChange}
            >
              {downConnectors.map((downConnector) => (
                <FormControlLabel
                  key={downConnector.value}
                  disabled={processing}
                  value={downConnector.value}
                  control={<Radio />}
                  label={t(downConnector.label)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              {t("deviceManagement.form.upConnector.label")}
            </FormLabel>
            <RadioGroup
              row
              aria-label="upConnector"
              name="upConnector"
              value={formik.values.upConnector}
              onChange={formik.handleChange}
            >
              {upConnectors.map((upConnector) => (
                <FormControlLabel
                  key={upConnector.value}
                  disabled={processing}
                  value={upConnector.value}
                  control={<Radio />}
                  label={t(upConnector.label)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="localFilePath"
            label={t("deviceManagement.form.localFilePath.label")}
            name="localFilePath"
            autoComplete="localFilePath"
            disabled={processing}
            value={formik.values.localFilePath}
            onChange={formik.handleChange}
            error={formik.touched.localFilePath && Boolean(formik.errors.localFilePath)}
            helperText={formik.touched.localFilePath && formik.errors.localFilePath}
          />
          <TextField
            margin="normal"
            required
            id="deviceType"
            disabled={processing}
            fullWidth
            select
            label={t("deviceManagement.form.deviceType.label")}
            name="deviceType"
            value={formik.values.deviceType}
            onChange={formik.handleChange}
            error={formik.touched.deviceType && Boolean(formik.errors.deviceType)}
            helperText={formik.touched.deviceType && formik.errors.deviceType}
          >
            {deviceTypes.map((deviceType) => (
              <MenuItem key={deviceType} value={deviceType}>
                {deviceType}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              name="disabled"
              disabled={processing}
              onChange={formik.handleChange}
              checked={formik.values.disabled}
              control={<Checkbox />}
              label={t("deviceManagement.form.disabled.label")}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("deviceManagement.modal.edit.action")
              : t("deviceManagement.modal.add.action")}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeviceDialog;
