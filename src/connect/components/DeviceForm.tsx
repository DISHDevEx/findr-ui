import axios, { AxiosResponse, AxiosError } from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from '@material-ui/styles';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import React, { useState } from 'react';
import { Device } from "../types/device";
import PublishIcon from '@mui/icons-material/Publish';
import Grid from '@mui/material/Grid';
import { ReactComponent as S3Svg } from "../assets/aws_s3_md.svg";
import { ReactComponent as DynamoSvg } from "../assets/dynamo_db_md.svg";
import { ReactComponent as MqttSvg } from "../assets/mqtt_md.svg";
import { ReactComponent as HttpSvg } from "../assets/http_md.svg";
import { mock } from "../../mocks/server";
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './mycomponent.css'; 



const oracleURL: string | undefined = process.env.REACT_APP_ORACLE_URL;

const destinations = [
  { label: "deviceManagement.form.destination.options.s", value: "s3" },
  { label: "deviceManagement.form.destination.options.d", value: "dynamodb" },
  { label: "deviceManagement.form.destination.options.b", value: "Blob Store" },
];

const sources = [
  { label: "deviceManagement.form.source.options.h", value: "http" },
  { label: "deviceManagement.form.source.options.m", value: "mqtts" },
];

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


  const handleSubmit1 = (values: Partial<Device>) => {
    // mock.reset();
    mock.restore();
    console.log("handling submit1");
    console.log(values);
    if (device && device.deviceId) {
      onUpdate({ ...values, id: device.deviceId } as Device);
    } else {
      onAdd(values);
    }
  };

  // const addDevice = async (device: Device): Promise<Device> => {
  //   mock.restore();
  //   const { data } = await findrapi.post("/oracle", device);
  //   return data;
  // };


  
    const findrapi = axios.create({
      baseURL: "http://a52c356e9b4b540c59d2c7db947ace25-1368697784.us-east-1.elb.amazonaws.com:9000",
      timeout: 10000,
      headers: {'Content-Type': 'application/json'}
    });
  
  
  const handleSubmit = (values: Partial<Device>) => {
    //mock.reset();
    mock.restore();
    console.log("handling submit");
    console.log(values);
    console.log(JSON.stringify(values));
    findrapi.post("/oracle", values)
      .then(function (res) {
         console.log(res)
         alert('Successfully registered device!');  
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
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

  const handleSubmit_async = async (values: Partial<Device>): Promise<void> => {
    try {
      // mock.reset();
      mock.restore();
  
      console.log("handling submit");
      console.log(values);
      console.log(JSON.stringify(values));
  
      // Make the POST request and await the response
      const res: AxiosResponse = await findrapi.post("/oracle", values);
  
      // Log the response and notify the user
      console.log(res);
      alert('Successfully registered device!');
    } catch (error) {
      // Handle errors
      console.log(JSON.stringify(error));
  
      if (axios.isAxiosError(error)) {
        // AxiosError-specific handling
        const axiosError: AxiosError = error;
  
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(axiosError.response.data);
          console.log(axiosError.response.status);
          console.log(axiosError.response.headers);
        } else if (axiosError.request) {
          // The request was made but no response was received
          // `axiosError.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          console.log(axiosError.request);
        }
      } else {
        // Generic error handling for other types of errors
        console.log('Error', error.message);
      }
  
      console.log(error.config);
    }
  };



  const formik = useFormik({
    initialValues: {
      deviceId: device ? device.deviceId : "",
      source: device ? device.source : "http",
      destination: device ? device.destination : "s3",
      httpPortNumber: device ? device.httpPortNumber : "",
      httpRoute: device ? device.httpRoute : "",
      mqttsBroker: device ? device.mqttsBroker : "",
      topic: device ? device.topic : "",
      clientId: device ? device.clientId : "",
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
    onSubmit: handleSubmit_async,
  });

  const handleSourceChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      formik.setFieldValue('source', newValue);
    }
  };

  const handleDestinationChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      formik.setFieldValue('destination', newValue);
    }
  };

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
            <ToggleButtonGroup
            orientation="horizontal"
            value={formik.values.source}
            exclusive
            onChange={handleSourceChange}
            aria-label="source"
          >
            <ToggleButton value="http" aria-label="http" className="custom-toggle-button" >
              <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <HttpSvg />
                  </Grid>
                  <Grid item>
                    <Typography>HTTP</Typography>
                  </Grid>
                </Grid>
            </ToggleButton>
            <ToggleButton value="mqtts" aria-label="mqtts" className="custom-toggle-button">
              <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <MqttSvg />
                    </Grid>
                    <Grid item>
                      <Typography>MQTT</Typography>
                    </Grid>
                  </Grid>
            </ToggleButton>
          </ToggleButtonGroup>
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
            <ToggleButtonGroup
              orientation="horizontal"
              value={formik.values.destination}
              exclusive
              onChange={handleDestinationChange}
              aria-label="destination"
            >
              <ToggleButton value="dynamodb" aria-label="dynamodb" className="custom-toggle-button">
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <DynamoSvg />
                    </Grid>
                    <Grid item>
                      <Typography>Dynamo DB</Typography>
                    </Grid>
                  </Grid>
              </ToggleButton>
              <ToggleButton value="s3" aria-label="s3"  className="custom-toggle-button">
                <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <S3Svg />
                      </Grid>
                      <Grid item>
                        <Typography>S3</Typography>
                      </Grid>
                    </Grid>
              </ToggleButton>
            </ToggleButtonGroup>
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
          onClick={() => handle}
        > 
          {t("Submit")}
        </Button>
    </form>
  </Box>
  );
};

export default DeviceForm;
