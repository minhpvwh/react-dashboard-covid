import React, {useEffect, useState} from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD-MM-YYYY')) || [];
    return {
        // set kích thước cho chart
        chart: {
            height: 500,
        },
        // title chart
        title: {
            text: 'Tổng ca nhiễm',
        },
        // cấu hình theo trục hoành
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        // màu line
        color: ['#F3585B'],
        // cấu hình theo trục hoành
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right'
            },
        },
        // custom hiển thị thông tin điểm trên line
        tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        // dữ liệu
        series: [
            {
                name: 'Tổng ca nhiễm',
                data: data.map((item) => item.Confirmed),
            },
        ],
    }
};

function LineChart({data}) {
    const [options, setOptions] = useState({});
    const [typeButtonColor, setTypeButtonColor] = useState('all');

    useEffect(() => {
        let customData = [];
        switch (typeButtonColor) {
            case '30':
                customData = data.slice(data.length - 30);
                break;
            case '7':
                customData = data.slice(data.length - 7);
                break;
            default:
                customData = data;
                break;
        }
        setOptions(generateOptions(customData));
    }, [data, typeButtonColor]);


    return (
        <div>
            <ButtonGroup size='small' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button color={typeButtonColor === 'all'? 'secondary': ''} onClick={() => setTypeButtonColor('all')}>Tất cả</Button>
                <Button color={typeButtonColor === '7'? 'secondary': ''} onClick={() => setTypeButtonColor('7')}>7 ngày</Button>
                <Button color={typeButtonColor === '30'? 'secondary': ''} onClick={() => setTypeButtonColor('30')}>30 ngày</Button>
            </ButtonGroup>
            <HighchartsReact
                highcharts={Highchart}
                options={options}
            />
        </div>
    );
}

export default React.memo(LineChart);