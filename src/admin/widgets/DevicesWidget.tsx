import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DevicesOther from "@material-ui/icons/DevicesOther";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

const devices = [
  {
    id: "1",
    firstName: "Rhys",
    destination: "S3",
    lastName: "Arriaga",
    deviceType: "Sensor",
  },
  {
    id: "2",
    firstName: "Laura",
    destination: "Dynamo DB",
    lastName: "Core",
    deviceType: "Camera",
  },
  {
    id: "3",
    firstName: "Joshua",
    destination: "Blob Store",
    lastName: "Jagger",
    deviceType: "Camera",
  },
];

const DevicesWidget = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t("dashboard.devices.title")} />
      <CardContent>
        <List>
          {devices.map((device) => (
            <ListItem disableGutters key={device.id}>
              <ListItemAvatar>
                <Avatar>
                  <DevicesOther />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${device.lastName} ${device.firstName}`}
                primaryTypographyProps={{
                  fontWeight: theme.typography.fontWeightMedium,
                }}
                secondary={device.deviceType}
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Go to device details"
                  component={RouterLink}
                  edge="end"
                  to={`/${process.env.PUBLIC_URL}/admin/device-management`}
                >
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DevicesWidget;
