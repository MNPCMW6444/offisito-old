import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PrimaryText } from "../../styled-components";
import { Asset, Company, WeekDays } from "../../../types";
import { format } from "../../utils";
import { axiosErrorToaster } from "../utils";
import { ServerContext } from "../../context";

export * from "./switches";

interface Options {
  label: string;
  multiline: boolean;
  number: boolean;
  customMinRows: number;
}

export const renderTextField = <T,>(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  optionalParams: Partial<Options> = {},
) => {
  const options = {
    ...{
      label: format(name as string),
      multiline: false,
      number: false,
      customMinRows: 2,
    },
    ...optionalParams,
  };
  return (
    <TextField
      multiline={options.multiline}
      fullWidth={options.multiline}
      minRows={options.multiline ? options.customMinRows : undefined}
      variant="outlined"
      label={options.label}
      value={formState ? formState[name] : ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleChange(name, e.target.value);
      }}
      name={name as string}
      type={options.number ? "number" : undefined}
    />
  );
};

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

export const renderSwitchGroupComplex = <T,>(
  formState: T,
  name: string | keyof T,
  keyOfArrayProperty: keyof T,
  setFormState: Dispatch<SetStateAction<T | undefined>>,
  debouncedUpdate: any,
) => (
  <Grid
    item
    container
    justifyContent="center"
    alignItems="center"
    rowSpacing={2}
    direction="column"
  >
    <Grid item>
      <PrimaryText>{name as string}:</PrimaryText>
    </Grid>
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      columnSpacing={2}
    >
      {Object.values(WeekDays).map((day) => {
        const isDayAvailable =
          formState?.[keyOfArrayProperty] &&
          ((formState?.[keyOfArrayProperty] as any).some
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              ((formState?.[keyOfArrayProperty] as any)?.some)((av: any) =>
                av.days_of_week.includes(day),
              )
            : false);

        return (
          <Grid item key={day}>
            {renderSwitch(
              formState,
              ((name: keyof Asset, value: boolean) => {
                const available = value;
                setFormState((prevState) => {
                  if (!prevState) return prevState;
                  let updatedAvailability =
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    prevState[keyOfArrayProperty]?.slice() || [];
                  if (available) {
                    if (
                      !updatedAvailability.some(
                        (av: { days_of_week: string | WeekDays[] }) =>
                          av.days_of_week.includes(day),
                      )
                    ) {
                      updatedAvailability.push({
                        days_of_week: [day],
                        time_range: [],
                      });
                    }
                  } else {
                    updatedAvailability = updatedAvailability.filter(
                      (av: { days_of_week: string | WeekDays[] }) =>
                        !av.days_of_week.includes(day),
                    );
                  }
                  const updatedState = {
                    ...prevState,
                    assetAvailability: updatedAvailability,
                  };
                  debouncedUpdate(updatedState);
                  return updatedState;
                });
              }) as any,
              day as any,
              day[0].toUpperCase() + day.substring(1),
              isDayAvailable,
            )}
          </Grid>
        );
      })}
    </Grid>
  </Grid>
);

export const renderSwitchGroupArray = <T,>(
  formState: T,
  name: string | keyof T,
  keyOfArrayProperty: keyof T,
  setFormState: Dispatch<SetStateAction<T | undefined>>,
  debouncedUpdate: any,
  options: { name: string; id: string }[],
) => (
  <Grid
    item
    container
    justifyContent="center"
    alignItems="center"
    rowSpacing={2}
    direction="column"
  >
    <Grid item>
      <PrimaryText>{name as string}:</PrimaryText>
    </Grid>
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      columnSpacing={2}
    >
      {Object.values(WeekDays).map((day) => {
        const isDayAvailable =
          formState?.[keyOfArrayProperty] &&
          ((formState?.[keyOfArrayProperty] as any).some
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              ((formState?.[keyOfArrayProperty] as any)?.some)((av: any) =>
                av.days_of_week.includes(day),
              )
            : false);

        return (
          <Grid item key={day}>
            {renderSwitch(
              formState,
              ((name: keyof Asset, value: boolean) => {
                const available = value;
                setFormState((prevState) => {
                  if (!prevState) return prevState;
                  let updatedAvailability =
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    prevState[keyOfArrayProperty]?.slice() || [];
                  if (available) {
                    if (
                      !updatedAvailability.some(
                        (av: { days_of_week: string | WeekDays[] }) =>
                          av.days_of_week.includes(day),
                      )
                    ) {
                      updatedAvailability.push({
                        days_of_week: [day],
                        time_range: [],
                      });
                    }
                  } else {
                    updatedAvailability = updatedAvailability.filter(
                      (av: { days_of_week: string | WeekDays[] }) =>
                        !av.days_of_week.includes(day),
                    );
                  }
                  const updatedState = {
                    ...prevState,
                    assetAvailability: updatedAvailability,
                  };
                  debouncedUpdate(updatedState);
                  return updatedState;
                });
              }) as any,
              day as any,
              day[0].toUpperCase() + day.substring(1),
              isDayAvailable,
            )}
          </Grid>
        );
      })}
    </Grid>
  </Grid>
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
    value={formState ? (formState[name] as any)._id || formState[name] : ""}
    onChange={(e) => handleChange(name, e.target.value as string)}
  >
    {options.map(({ label, value }) => (
      <MenuItem key={value.toString()} value={value as string}>
        {label || (value as string)}
      </MenuItem>
    ))}
  </Select>
);
