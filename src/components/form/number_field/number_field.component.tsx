import { TextField as InputField } from "@mui/material";

interface PropsType {
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const NumberField = ({
  label,
  value,
  onChange,
  disabled = false,
}: PropsType) => (
  <InputField
    label={label}
    value={value ? Number((+value).toFixed(3)) : ""}
    type="number"
    onChange={onChange}
    disabled={disabled}
    variant="outlined"
    sx={{
      width: 150,
      "& .MuiInputBase-input": {
        fontSize: 25,
      },
      "& .MuiInputLabel-root": {
        fontSize: 25,
        transform: "translate(14px, -9px) scale(0.75)",
      },
    }}
  />
);
