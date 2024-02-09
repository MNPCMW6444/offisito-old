import {
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export * from "./switches";
export * from "./labels";

export const renderTextField = <T,>(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string,
) => (
  <TextField
    multiline
    variant="outlined"
    label={label}
    value={formState ? formState[name] : ""}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
      handleChange(name, e.target.value);
    }}
    name={name as string}
  />
);

export const renderSwitch = <T,>(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string,
  isDayAvailable = false,
) => (
  <FormControlLabel
    sx={(theme) => ({ color: theme.palette.primary.main })}
    control={
      <Switch
        checked={!!isDayAvailable || !!formState?.[name]}
        onChange={(e: any) => {
          handleChange(name, e.target.checked);
        }}
        name={name as string}
      />
    }
    label={label}
  />
);

export const renderDatePicker = <T,>(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string,
) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={label}
      value={dayjs(
        formState && formState[name]
          ? new Date(formState ? (formState[name] as Date) : Date.now())
          : new Date(),
      )}
      onChange={(newDate) =>
        handleChange(name, newDate ? new Date(newDate.valueOf()) : new Date())
      }
      name={name as string}
    />
  </LocalizationProvider>
);

export const renderDropdown = <T,>(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string,
  options: { value: string | Date | boolean; label?: string }[],
) => (
  <Select
    name={name as string}
    label={label}
    value={formState ? formState[name] : ""}
    onChange={(e) => handleChange(name, e.target.value as string)}
  >
    {options.map(({ label, value }) => (
      <MenuItem key={value as string} value={value as string}>
        {label || (value as string)}
      </MenuItem>
    ))}
  </Select>
);
