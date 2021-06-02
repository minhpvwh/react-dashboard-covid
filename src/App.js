import React, {useEffect, useState} from "react";
import CountrySelector from "./components/CountrySelector";
import {getCountries, getReportByCountry} from "./apis";
import Highlights from "./components/Highlights";
import Summary from "./components/Summary";
import { sortBy } from 'lodash';
import moment from "moment";
import 'moment/locale/vi';
import Typography from "@material-ui/core/Typography";
import '@fontsource/roboto';
import Container from "@material-ui/core/Container";

moment.locale('vi');

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [reportCountry, setReportCountry] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            setCountries(sortBy(res.data, 'Country'));
            setSelectedCountryId('vn');
        });
    }, []);

    const handleOnchange = (e) => {
        setSelectedCountryId(e.target.value);
    };

    useEffect(() => {
        if (selectedCountryId ) {
            const {Slug} = countries.find(
                (country) => country.ISO2.toLowerCase() === selectedCountryId
            );
            getReportByCountry(Slug).then((res) => {
                setReportCountry(sortBy(res.data, 'Date'));
            });
        }
    }, [countries, selectedCountryId]);


    return (
        <Container style={{marginTop: 20}}>
            <Typography component='h2' variant='h2'>Số liệu thống kê Covid-19 thế giới</Typography>
            <Typography component='p' variant='body2'>Ngày {moment().format('LLL')}</Typography>
            <CountrySelector countries={countries} handleOnchange={handleOnchange} value={selectedCountryId}/>
            <Highlights reportCountry={reportCountry}/>
            <Summary reportCountry={reportCountry} selectedCountryId={selectedCountryId}/>
        </Container>
    );
}

export default App;
