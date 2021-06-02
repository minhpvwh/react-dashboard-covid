import React from "react";
import Grid from "@material-ui/core/Grid";
import HighlightsCard from "./HighlightCard";


function Highlights({reportCountry}) {
    const data = reportCountry && reportCountry.length > 0 ? reportCountry[reportCountry.length - 1]: [];
    console.log(data)

    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed'
        },
        {
            title: 'Khỏi',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Tử vong',
            count: data.Deaths,
            type: 'deaths'
        },
    ];

    return (
        <Grid container spacing={3}>
            {
                summary.map((element, index) => {
                    return (
                        <Grid key={index} item sm={4} xs={12}>
                            <HighlightsCard title={element.title} count={element.count} type={element.type}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default Highlights;