import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/contexts/AuthProvider";
import LooksOneIcon from '@mui/icons-material/LooksOne';

const AdminGuide = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  return (
    <Paper variant="outlined">
        <Card elevation={0} sx={{ backgroundColor: "transparent", mb: 2 }}>
        <CardContent>
            {/* <Typography component="div" gutterBottom variant="h4">
            {t("admin.home.welcome.title", { name: userInfo?.firstName })}
            </Typography> */}
            <Typography
            component="div"
            sx={{ fontWeight: 500, mb: 4 }}
            variant="h2"
            >
            {t("FINDR Guide- Connect")}

            </Typography>
            <Typography
            component="p"
            gutterBottom
            marginBottom={2}
            variant="subtitle1"
            style={{whiteSpace: 'pre-line'}}
            >
            1. Collect the neccessary information regarding your device. {'\n\n'}
            2. Navigate to the Connect tab found in the lefthand pane. {'\n\n'}
            3. Enter the Device ID which must start with an alphabetic character. {'\n\n'}
            4. Determine whether or not your device utilizes MQTT or HTTP protocol. {'\n\n'}
            5. You may toggle between these source options. The color of the icon will indicate your choice. Please fill in the information for the corresponding parameters. {'\n\n'}
            6. Determine whether or not your data should be sent to S3 or DynamoDB. {'\n\n'}
            7. You may toggle between these destination options. The color of the icon will indicate your choice. Please fill in the information for the corresponsing parameters. {'\n\n'}
            8. If the device is successfully registered, you may receive a notification indicating that you successfully registered your device. Otherwise, a notification with an error message will display. 
            Please take note of the error and contact FINDR support. 

            </Typography>

            
            {/* <SvgContainer>
            <WelcomeSvg />
            </SvgContainer> */}
        </CardContent>
        </Card>
    </Paper>
  );
};

export default AdminGuide;
