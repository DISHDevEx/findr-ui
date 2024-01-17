import Stack from "@material-ui/core/Stack";
import React from "react";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import RecentNotifications from "../components/RecentNotifications";;
import WelcomeWidget from "../widgets/WelcomeWidget";
// import if you want to include widgets on the home page
// import Grid from "@material-ui/core/Grid";
// import AchievementWidget from "../widgets/AchievementWidget";
// import FollowersWidget from "../widgets/FollowersWidget";
// import PersonalTargetsWidget from "../widgets/PersonalTargetsWidget";
// import ViewsWidget from "../widgets/ViewsWidget";


const Home = () => {
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar>
          <RecentNotifications />
        </AdminToolbar>
      </AdminAppBar>
      <Stack spacing={2}>
        <WelcomeWidget />
      </Stack>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <WelcomeWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FollowersWidget />
          <ViewsWidget />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
};

export default Home;
