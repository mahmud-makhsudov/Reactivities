import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {


    return (
        <Grid container spacing={3} sx={{marginBottom: "30px"}}>
            <Grid size={7}>
                <ActivityList/>
            </Grid>
            <Grid size={5}>
                Activity filters
            </Grid>
        </Grid>
    )
}