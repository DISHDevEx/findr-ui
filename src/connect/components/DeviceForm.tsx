import axios from "axios";
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
import { useSettings } from "../../core/contexts/SettingsProvider";
import { ReactComponent as S3Svg } from "../assets/amazon-s3.svg";
import { ReactComponent as DynamoSvg } from "../assets/aws-dynamodb.svg";
import { ReactComponent as MqttSvg } from "../assets/mqtt_logo.svg";
import { ReactComponent as HttpSvg } from "../assets/http_logo.svg";
import { mock } from "../../mocks/server";

const destinations = [
  { label: "deviceManagement.form.destination.options.s", value: "s3" },
  { label: "deviceManagement.form.destination.options.d", value: "dynamodb" },
  { label: "deviceManagement.form.destination.options.b", value: "Blob Store" },
];

const sources = [
  { label: "deviceManagement.form.source.options.h", value: "http" },
  { label: "deviceManagement.form.source.options.m", value: "mqtts" },
];

const deviceTypes = ["Sensor", "Camera"];

type DeviceFormProps = {
  onAdd: (device: Partial<Device>) => void;
  onClose: () => void;
  onUpdate: (device: Device) => void;
  open: boolean;
  processing: boolean;
  device: Device;
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

  const handleSubmit1 = (values: Partial<Device>) => {
    console.log(values)
    if (device && device.id) {
      onUpdate({ ...values, id: device.id } as Device);
    } else {
      onAdd(values);
    }
  };

    const findrapi = axios.create({
      baseURL: 'http://10.5.130.98:8080',
      timeout: 1000,
      headers: {'Content-Type': 'application/json'}
    });
  
  
  const handleSubmit = (values: Partial<Device>) => {
    mock.restore();
    console.log(values);
    console.log(JSON.stringify(values));
    findrapi.post("/oracle", values)
      .then(function (res) {
         console.log(res)
         alert('Successfully signed up!');  
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.toJSON());
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
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
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mb: 3,
      }}
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        {/* <TextField
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
        /> */}
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
        {/* <TextField
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
        /> */}
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
            <FormControlLabel value="http" control={<Radio />} label={<HttpSvg style={{ maxWidth: 220, width: "100%" }} />} />
            <FormControlLabel value="mqtts" control={<Radio />} label={<MqttSvg style={{ maxWidth: 200, width: "100%" }} />} />
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

        {/* {formik.values.source === 'mqtts' && (
            <TextField
              label="Ca File Path"
              margin="normal"
              required
              fullWidth
              id="caFilePath"
              name="caFilePath"
              value={formik.values.caFilePath}
              onChange={formik.handleChange}
            />
          )} */}


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
            <FormControlLabel value="dynamodb" control={<Radio />} label={<DynamoSvg style={{ maxWidth: 200, width: "100%" }} />} />
            <FormControlLabel value="s3" control={<Radio />} label={<S3Svg style={{ maxWidth: 300, width: "100%" }} />} />
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
        {/* <TextField
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
        </TextField> */}
        {/* <FormControl component="fieldset" margin="normal">
          <FormControlLabel
            name="disabled"
            disabled={processing}
            onChange={formik.handleChange}
            checked={formik.values.disabled}
            control={<Checkbox />}
            label={t("deviceManagement.form.disabled.label")}
          />
        </FormControl> */}
        <Button 
          variant="contained" 
          type="submit"
          endIcon={<PublishIcon />}
          // onClick={() => onAdd}
        > 
          {t("Submit")}
        </Button>
        {/* <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("deviceManagement.modal.edit.action")
              : t("deviceManagement.modal.add.action")}
        </LoadingButton> */}
    </form>
  </Box>
  );
};

export default DeviceForm;
