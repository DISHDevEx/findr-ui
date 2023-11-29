import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
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
import PublishIcon from '@mui/icons-material/Publish';

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

type DeviceFormProps = {
  onAdd: (device: Partial<Device>) => void;
  onClose: () => void;
  onUpdate: (device: Device) => void;
  open: boolean;
  processing: boolean;
  device?: Device;
};

const DeviceForm = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  device,
}: DeviceFormProps) => {
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
      macAddress: device ? device.macAddress : "",
      firstName: device ? device.firstName : "",
      upConnector: device ? device.upConnector : "S3",
      lastName: device ? device.lastName : "",
      deviceType: device ? device.deviceType : "",
    },
    validationSchema: Yup.object({
      macAddress: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      firstName: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      lastName: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      deviceType: Yup.string().required(t("common.validations.required")),
    }),
    onSubmit: handleSubmit,
  });

  return (
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mb: 3,
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label={t("deviceManagement.form.lastName.label")}
        name="lastName"
        autoComplete="family-name"
        autoFocus
        disabled={processing}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
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
        id="macAddress"
        label={t("deviceManagement.form.macAddress.label")}
        name="macAddress"
        autoComplete="macAddress"
        disabled={processing}
        value={formik.values.macAddress}
        onChange={formik.handleChange}
        error={formik.touched.macAddress && Boolean(formik.errors.macAddress)}
        helperText={formik.touched.macAddress && formik.errors.macAddress}
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
      <Button 
        variant="contained" 
        endIcon={<PublishIcon />}
        onClick={onClose}
      > 
        Submit
        {t("common.cancel")}
      </Button>
  </Box>
  );
};

export default DeviceForm;
