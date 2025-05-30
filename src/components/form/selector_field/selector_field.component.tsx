import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface PropsType {
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
  values: string[] | number[];
}

export const SelectorField = ({
  label,
  value,
  handleChange,
  values,
}: PropsType) => (
  <FormControl sx={{ m: 1, minWidth: 80, maxWidth: 150 }}>
    <InputLabel>{label}</InputLabel>

    <Select value={value} onChange={handleChange} autoWidth label={label}>
      {values.map((currentItem) => (
        <MenuItem key={currentItem} value={currentItem}>
          {currentItem}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
