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

const destinations = [
  { label: "deviceManagement.form.destination.options.s", value: "S3" },
  { label: "deviceManagement.form.destination.options.d", value: "Dynamo DB" },
  { label: "deviceManagement.form.destination.options.b", value: "Blob Store" },
];

const sources = [
  { label: "deviceManagement.form.source.options.h", value: "HTTP" },
  { label: "deviceManagement.form.source.options.m", value: "MQTT" },
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

  const editMode = Boolean(device && device.deviceId);

  const handleSubmit = (values: Partial<Device>) => {
    if (device && device.deviceId) {
      onUpdate({ ...values, id: device.deviceId } as Device);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      // disabled: device ? device.disabled : false,
      //localFilePath: device ? device.localFilePath : "",
      deviceId: device ? device.deviceId : "",
      source: device ? device.source : "mqtts",
      destination: device ? device.destination : "s3",
      // deviceTemplate: device ? device.deviceTemplate : "",
      // deviceType: device ? device.deviceType : "",
      httpPortNumber: device ? device.httpPortNumber : "",
      httpRoute: device ? device.httpRoute : "",
      mqttsBroker: device ? device.mqttsBroker : "",
      topic: device ? device.topic : "",
      clientId: device ? device.clientId : "",
      //caFilePath: device ? device.caFilePath : "",
      s3BucketName: device ? device.s3BucketName : "",
      s3Region: device ? device.s3Region : "",
      s3FileKey: device ? device.s3FileKey : "",
      dynamoDBTableName: device ? device.dynamoDBTableName : "",
      dynamoDBRegion: device ? device.dynamoDBRegion : "",
    },
    validationSchema: Yup.object({
      deviceId: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      source: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      destination: Yup.string().required(t("common.validations.required")),
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
            id="deviceId"
            label={t("deviceManagement.form.deviceId.label")}
            name="deviceId"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.deviceId}
            onChange={formik.handleChange}
            error={formik.touched.deviceId && Boolean(formik.errors.deviceId)}
            helperText={formik.touched.deviceId && formik.errors.deviceId}
          />
          <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">
            {t("deviceManagement.form.source.label")}
          </FormLabel>
          <RadioGroup
            row
            aria-label="source"
            name="source"
            value={formik.values.source}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="http" control={<Radio />} label={"http"} />
            <FormControlLabel value="mqtts" control={<Radio />} label={"mqtts"} />
          </RadioGroup>
        </FormControl>

        {formik.values.source === 'http' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="HTTP Port Number"
            id="httpPortNumber"
            name="httpPortNumber"
            value={formik.values.httpPortNumber}
            onChange={formik.handleChange}
          />
        )}

        {formik.values.source === 'http' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="HTTP Route"
            id="httpRoute"
            name="httpRoute"
            value={formik.values.httpRoute}
            onChange={formik.handleChange}
          />
        )}

        {formik.values.source === 'mqtts' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="MQTT Broker"
            id="mqttsBroker"
            name="mqttsBroker"
            value={formik.values.mqttsBroker}
            onChange={formik.handleChange}
          />
        )}

        {formik.values.source === 'mqtts' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="MQTT Topic"
            id="topic"
            name="topic"
            value={formik.values.topic}
            onChange={formik.handleChange}
          />
        )}

        {formik.values.source === 'mqtts' && (
          <TextField
            margin="normal"
            required
            fullWidth
            id="clientId"
            name="clientId"
            value={formik.values.clientId}
            onChange={formik.handleChange}
            label="MQTT Client ID"
          />
        )}
          <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">
            {t("deviceManagement.form.destination.label")}
          </FormLabel>
          <RadioGroup
            row
            aria-label="destination"
            name="destination"
            value={formik.values.destination}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="dynamodb" control={<Radio />} label={"Dynamo DB"} />
            <FormControlLabel value="s3" control={<Radio />} label={"S3"} />
          </RadioGroup>
        </FormControl>

        {formik.values.destination === 's3' && (
          <TextField
          label="S3 Bucket"
          margin="normal"
          required
          fullWidth
          id="s3BucketName"
          name="s3BucketName"
          value={formik.values.s3BucketName}
          onChange={formik.handleChange}
          />
        )}

        {formik.values.destination === 's3' && (
          <TextField
          label="S3 File Key"
          margin="normal"
          required
          fullWidth
          id="s3FileKey"
          name="s3FileKey"
          value={formik.values.s3FileKey}
          onChange={formik.handleChange}
          />
        )}

        {formik.values.destination === 's3' && (
          <TextField
          label="S3 Region"
          margin="normal"
          required
          fullWidth
          id="s3Region"
          name="s3Region"
          value={formik.values.s3Region}
          onChange={formik.handleChange}
          />
        )}

        {formik.values.destination === 'dynamodb' && (
          <TextField
          label="Dynamo DB Table Name"
          margin="normal"
          required
          fullWidth
          id="dynamoDBTableName"
          name="dynamoDBTableName"
          value={formik.values.dynamoDBTableName}
          onChange={formik.handleChange}
          />
        )}

        {formik.values.destination === 'dynamodb' && (
          <TextField
          label="Dynamo DB Region"
          margin="normal"
          required
          fullWidth
          id="dynamoDBRegion"
          name="dynamoDBRegion"
          value={formik.values.dynamoDBRegion}
          onChange={formik.handleChange}
          />
        )}
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
