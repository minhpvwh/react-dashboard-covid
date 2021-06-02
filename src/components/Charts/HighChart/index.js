import React, {useEffect, useRef, useState} from "react";
import Highchart from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";

//load highcharts modules
highchartsMap(Highchart);

const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null,
    },
    // có thể kéo thả map
    mapNavigation: {
        enabled: true,
    },
    // từng mốc giá trị có màu tương ứng
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#7A0826'],
        ],
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },
    series: [
        {
            mapData: {},
            name: 'Dân số',
            joinBy: ['hc-key', 'key'],
        }
    ]
};

function HighChart({mapData}) {
    const [options, setOptions] = useState({});
    const chartRef = useRef(null);
    const [configLoaded, setConfigLoaded] = useState(false);

    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((features, index) => ({
                key: features.properties['hc-key'],
                value: index,
            }));
            console.log("fakeData", fakeData);
            setOptions({
                ...initOptions, series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: fakeData,
                    }
                ]
            });
            if (!configLoaded) setConfigLoaded(true);
        }
    }, [mapData, configLoaded]);

    useEffect(() => {
        if(chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            })
        }
    }, [mapData]);

    if (!configLoaded) return null;

    return (
        <HighchartsReact
            highcharts={Highchart}
            options={options}
            constructorType='mapChart'
            ref={chartRef}
        />
    );
}

export default React.memo(HighChart);