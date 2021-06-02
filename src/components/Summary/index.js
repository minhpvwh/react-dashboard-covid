import React, {useEffect, useState} from "react";
import LineChart from "../Charts/LineChart";
import HighChart from "../Charts/HighChart";
import Grid from "@material-ui/core/Grid";


function Summary({reportCountry, selectedCountryId}) {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if (selectedCountryId) {
          import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`).then((res) => setMapData(res));
        }
    }, [selectedCountryId]);


    return (
        <Grid container spacing={3} style={{marginTop: 10}}>
            <Grid item sm={8} xs={12}>
                <LineChart data={reportCountry}/>
            </Grid>
            <Grid item sm={4} xs={12}>
                <HighChart mapData={mapData}/>
            </Grid>
        </Grid>
    );
}

export default Summary;