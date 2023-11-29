import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import SvgContainer from "../../core/components/SvgContainer";
import { ReactComponent as S3Svg } from "../../connect/assets/s3.svg";
import { ReactComponent as DynamoSvg } from "../../connect/assets/dynamodb.svg";


const DeviceRegistration = () => {
  const { isLoggingOut, logout, userInfo } = useAuth();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout().catch(() =>
      snackbar.error(t("common.errors.unexpected.subTitle"))
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <SvgContainer>
              <S3Svg style={{ maxWidth: 280, width: "100%" }} />
            </SvgContainer>
            <Typography
              component="div"
              variant="h4"
            >{`S3`}</Typography>
          </Box>
        </Grid>
        <Grid container spacing={4}>
        <Grid item xs={12} md={6} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <SvgContainer>
              <DynamoSvg style={{ maxWidth: 280, width: "100%" }} />
            </SvgContainer>
            <Typography
              component="div"
              variant="h4"
            >{`DynamoDB`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} marginTop={3}>
          <Box sx={{ mb: 4 }}>
            <Tabs aria-label="profile nav tabs" value={false}>
              {profileMenuItems.map((item) => (
                <Tab
                  key={item.key}
                  activeClassName="Mui-selected"
                  end={true}
                  component={NavLink}
                  label={t(item.key)}
                  to={item.path}
                />
              ))}
            </Tabs>
          </Box>
          <QueryWrapper>
            <Outlet />
          </QueryWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DeviceRegistration;
