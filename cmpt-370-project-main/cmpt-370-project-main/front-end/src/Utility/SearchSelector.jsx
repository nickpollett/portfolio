import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


// dropdown selector with search
export default function SearchSelector({ data, title, value, setValue }) {
    return (
        <Autocomplete
            defaultValue={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            id="select"
            sx={{ width: 260 }}
            options={data || []}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box component="li" key={option.id} {...props}>
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={title}
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
}
