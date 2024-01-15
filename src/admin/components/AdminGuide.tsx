import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { ReactComponent as WelcomeSvg } from "../../core/assets/welcome.svg";
import SvgContainer from "../../core/components/SvgContainer";

const AdminGuide = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  return (
    <Paper variant="outlined">
        <Card elevation={0} sx={{ backgroundColor: "transparent", mb: 2 }}>
        <CardContent>
            <Typography component="div" gutterBottom variant="h4">
            {t("admin.home.welcome.title", { name: userInfo?.firstName })}
            </Typography>
            <Typography
            component="div"
            sx={{ fontWeight: 300, mb: 4 }}
            variant="h2"
            >
            {t("your guide to using FINDR Connect")}
            </Typography>
            <Typography
            color="textSecondary"
            component="p"
            gutterBottom
            marginBottom={2}
            variant="subtitle1"
            >
            "1. Collect the neccessary information regarding your device
            {'\n'}
            2. Potato
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
