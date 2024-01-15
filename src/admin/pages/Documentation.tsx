import Grid from "@material-ui/core/Grid";
import Stack from "@material-ui/core/Stack";
import React from "react";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import AdminGuide from "../components/AdminGuide";
import RecentNotifications from "../components/RecentNotifications";
import WelcomeWidget from "../widgets/WelcomeWidget";


const Documentation = () => {
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar>
          <RecentNotifications />
        </AdminToolbar>
      </AdminAppBar>
      <Stack spacing={2}>
        <AdminGuide />
      </Stack>
    </React.Fragment>
  );
};

export default Documentation;
