import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core";
import CountUp from 'react-countup';

const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === 'confirmed') return {borderLeft: '5px solid #c9302c'};
        if (props.type === 'recovered') return {borderLeft: '5px solid #28a745'};
        else return {borderLeft: '5px solid gray'};
    },
    title: {
        fontSize: 18,
        marginBottom: 5
    },
    count: {
        fontWeight: 'bold',
        fontSize: 18
    }
});


function HighlightsCard({title, count, type}) {
    const styles = useStyles({type});

    return (
        <Card className={styles.wrapper}>
            <CardContent>
                <Typography component='p' variant='body2' className={styles.title}>{title}</Typography>
                <Typography component='p' variant='body2' className={styles.count}>
                    <CountUp end={count || 0} duration={2} separator=','/>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default HighlightsCard;