import { useEffect, useState, type SyntheticEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router";
import { formatDate } from "../../lib/util/util";
import { useProfile } from "../../lib/hooks/useProfile";

const tabs = [
  { label: "Future Events", filter: "future" },
  { label: "Past Events", filter: "past" },
  { label: "Hosting", filter: "hosting" },
] as const;

export default function ProfileActivities() {
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useParams();
  const { userActivities, setFilter, loadingUserActivities } = useProfile(id);

  useEffect(() => {
    setFilter(tabs[activeTab].filter);
  }, [activeTab, setFilter]);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
        {tabs.map((tab) => (
          <Tab label={tab.label} key={tab.filter} />
        ))}
      </Tabs>

      {!loadingUserActivities &&
        (!userActivities || userActivities.length === 0) && (
          <Typography mt={2}>No activities to show</Typography>
        )}
      {loadingUserActivities && <Typography mt={2}>Loading activities...</Typography>}

      <Grid
        container
        spacing={2}
        sx={{ mt: 1, height: 350, overflowY: "auto", alignContent: "flex-start" }}
      >
        {userActivities?.map((activity) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
            <Link
              to={`/activities/${activity.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card elevation={4}>
                <CardMedia
                  component="img"
                  height="100"
                  image={`/images/categoryImages/${activity.category}.jpg`}
                  alt={`${activity.category} activity`}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" textAlign="center" mb={1}>
                    {activity.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <span>{formatDate(new Date(activity.date))}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
