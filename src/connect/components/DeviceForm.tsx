import Button from "@material-ui/core/Button";
import LoadingButton from '@mui/lab/LoadingButton';
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
import CircularProgress from '@mui/material/CircularProgress';



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
  const [loading, setLoading] = useState(false);




  // const handleMock = (values: Partial<Device>) => {
  //   if (device && device.deviceId) {
  //     onUpdate({ ...values, id: device.deviceId } as Device);
  //   } else {
  //     onAdd(values);
  //   }
  // };

  async function handleSubmit_fetch(values: Partial<Device>) {
    try {
      setLoading(true);
      const response = await fetch(`http://3.95.191.132:30806/oracle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log("handling submit fetch");
      console.log('values:',JSON.stringify(values));

      if (response.ok) {
        if (response.status === 200) {
          alert('Successfully registered device!');
          //handleMock
          if (device && device.deviceId) {
            onUpdate({ ...values, id: device.deviceId } as Device);
          } else {
            onAdd(values);
          }
        }
        const responseData = await response;
        console.log('Response:', responseData);
      }
        else {
          const errorMessage = `Error with response!: ${response.status} ${response.statusText}`;
          alert(errorMessage);
        }
    } catch (error: any) {
        console.log('Error:', error);
        const errorMessage = `Error!: ${error.status} ${error.statusText}`;
        alert(errorMessage);
    }
      finally {
        setLoading(false);
    }
  };
  


  
    // const findrapi = axios.create({
    //   baseURL: "http://3.95.191.132:30806",
    //   headers: {'Content-Type': 'application/json'}
    // });
  
  
  // const handleSubmit = (values: Partial<Device>) => {
  //   //mock.reset();
  //   mock.restore();
  //   console.log("handling submit");
  //   console.log(values);
  //   console.log(JSON.stringify(values));
  //   findrapi.post("/oracle", values)
  //     .then(function (res) {
  //        console.log('res:', res)
  //        if (res.status === 200) {
  //         alert('Successfully registered device!');
  //       } 
  //     })
  //     .catch(function (error) {
  //       console.log(JSON.stringify(error));
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.toJSON());
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);

  //         if (error.response.status === 500 || error.response.status === 400) {
  //           const errorMessage = `Error!: ${error.response.data}`;
  //           alert(errorMessage);
  //         }

  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         alert('Error!');
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         alert('Error!');
  //         console.log('Error', error.message);
  //       }
  //       console.log(error.config);
  //     });
  // };

  // const handleSubmit_async = async (values: Partial<Device>): Promise<void> => {
  //   try {
  //     // mock.reset();
      
  //     mock.restore();
  
  //     console.log("handling submit async");
  //     console.log('values:', values);
  //     console.log(JSON.stringify(values));
  
  //     // Make the POST request and await the response
  //     const res: AxiosResponse = await findrapi.post("/oracle", values);
  
  //     // Log the response and notify the user
  //     console.log(res);
  //     if (res.status === 200) {
  //       alert('Successfully registered device!');
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     alert('Error!');
  //     console.log(JSON.stringify(error));
  
  //     if (axios.isAxiosError(error)) {
  //       // AxiosError-specific handling
  //       const axiosError: AxiosError = error;
  
  //       if (axiosError.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log("The request was made and the server responded with a status code that falls out of the range of 2xx:");
  //         console.log(axiosError.response.data);
  //         console.log(axiosError.response.status);
  //         console.log(axiosError.response.headers);
  //       } else if (axiosError.request) {
  //         // The request was made but no response was received
  //         // `axiosError.request` is an instance of XMLHttpRequest in the browser
  //         // and an instance of http.ClientRequest in node.js
  //         console.log('The request was made but no response was received. axiosError.request is an instance of XMLHttpRequest in the browser and and an instance of http.ClientRequest in node.js:', axiosError.request);
  //       }
  //     } else {
  //       // Generic error handling for other types of errors
  //       console.log('Error', error.message);
  //     }
  
  //     console.log('Error config:', error.config);
  //   }
  // };



  const formik = useFormik({
    initialValues: {
      deviceId: device ? device.deviceId : "",
      source: device ? device.source : "http",
      destination: device ? device.destination : "s3",
      httpPortNumber: device ? device.httpPortNumber : "",
      httpRoute: device ? device.httpRoute : "",
      httpIp: device ? device.httpIp : "",
      httpResponseKey: device ? device.httpResponseKey : "",
      httpRequestInterval: device ? device.httpRequestInterval : "",
      mqttsBroker: device ? device.mqttsBroker : "",
      topic: device ? device.topic : "",
      clientId: device ? device.clientId : "",
      s3BucketName: device ? device.s3BucketName : "",
      s3Region: device ? device.s3Region : "",
      s3FileKey: device ? device.s3FileKey : "",
      dynamodbTableName: device ? device.dynamodbTableName : "",
      dynamodbRegion: device ? device.dynamodbRegion : "",
      certificate: device ? device.certificate : "",
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
    onSubmit: handleSubmit_fetch,
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
      <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }} noValidate>
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="certificate"
          label="certificate"
          name="certificate"
          //autoComplete="given-name"
          disabled={processing}
          value={formik.values.certificate}
          onChange={formik.handleChange}
          error={formik.touched.certificate && Boolean(formik.errors.certificate)}
          helperText={formik.touched.certificate && formik.errors.certificate}
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

        {formik.values.source === 'http' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="HTTP IP"
            id="httpIp"
            name="httpIp"
            value={formik.values.httpIp}
            onChange={formik.handleChange}
          />
        )}

        {formik.values.source === 'http' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="HTTP Response Key"
            id="httpResponseKey"
            name="httpResponseKey"
            value={formik.values.httpResponseKey}
            onChange={formik.handleChange}
          />
        )}

        {formik.values.source === 'http' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="HTTP Request Interval"
            id="httpRequestInterval"
            name="httpRequestInterval"
            value={formik.values.httpRequestInterval}
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
          id="dynamodbTableName"
          name="dynamodbTableName"
          value={formik.values.dynamodbTableName}
          onChange={formik.handleChange}
          />
        )}

        {formik.values.destination === 'dynamodb' && (
          <TextField
          label="Dynamo DB Region"
          margin="normal"
          required
          fullWidth
          id="dynamodbRegion"
          name="dynamodbRegion"
          value={formik.values.dynamodbRegion}
          onChange={formik.handleChange}
          />
        )}
        <Button 
          variant="contained" 
          type='submit'
          endIcon={<PublishIcon />}
          //onClick={() => handleSubmit_async(formik.values)}
        > 
          {t("Submit")}
        </Button>
        <LoadingButton
          loading={loading}
          type='submit'
          variant="contained"
          color="primary"
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
          {t("Submit")}
        </LoadingButton>
    </form>
  </Box>
  );
};

export default DeviceForm;
