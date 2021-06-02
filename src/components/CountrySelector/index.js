import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
    }
}));

function CountrySelector({countries, value, handleOnchange}) {
    const styles = useStyles();

    return (
        <FormControl className={styles.formControl}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <InputLabel shrink htmlFor='country-selector'>Quốc gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnchange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {
                    countries.map((country, index) => {
                        return <option key={index} value={country.ISO2.toLowerCase()}>{country.Country}</option>
                    })
                }
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;