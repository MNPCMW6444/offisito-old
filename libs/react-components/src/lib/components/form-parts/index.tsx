import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField
} from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PrimaryText } from '@monorepo/react-styles';
import { Asset, Company, WeekDays } from '@monorepo/types';

export * from './switches';
export * from './labels';

export const renderTextField = <T, >(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string
) => (
  <TextField
    multiline
    variant="outlined"
    label={label}
    value={formState ? formState[name] : ''}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
      handleChange(name, e.target.value);
    }}
    name={name as string}
  />
);

export const renderSwitch = <T, >(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string,
  isDayAvailable = false
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

export const renderSwitchGroup = <T, >(
  formState: T,
  name: string | keyof T,
  keyOfArrayProperty: keyof T,
  setFormState: Dispatch<SetStateAction<T>>
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
            ? ((formState?.[keyOfArrayProperty] as any)?.some)((av: any) =>
              av.days_of_week.includes(day)
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
                    prevState.[keyOfArrayProperty]?.slice() || [];
                  if (available) {
                    if (
                      !updatedAvailability.some((av) =>
                        av.days_of_week.includes(day)
                      )
                    ) {
                      updatedAvailability.push({
                        days_of_week: [day],
                        time_range: []
                      });
                    }
                  } else {
                    updatedAvailability = updatedAvailability.filter(
                      (av) => !av.days_of_week.includes(day)
                    );
                  }
                  const updatedState = {
                    ...prevState,
                    assetAvailability: updatedAvailability
                  };
                  debouncedUpdate(updatedState as unknown as Company);
                  return updatedState;
                });
              }) as any,
              day as unknown as keyof Asset,
              day[0].toUpperCase() + day.substring(1),
              isDayAvailable
            )}
          </Grid>
        );
      })}
    </Grid>
  </Grid>
);

export const renderDatePicker = <T, >(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string
) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={label}
      value={dayjs(
        formState && formState[name]
          ? new Date(formState ? (formState[name] as Date) : Date.now())
          : new Date()
      )}
      onChange={(newDate) =>
        handleChange(name, newDate ? new Date(newDate.valueOf()) : new Date())
      }
      name={name as string}
    />
  </LocalizationProvider>
);

export const renderDropdown = <T, >(
  formState: T,
  handleChange: (name: keyof T, value: string | Date | boolean) => void,
  name: keyof T,
  label: string,
  options: { value: string | Date | boolean; label?: string }[]
) => (
  <Select
    name={name as string}
    label={label}
    value={formState ? formState[name] : ''}
    onChange={(e) => handleChange(name, e.target.value as string)}
  >
    {options.map(({ label, value }) => (
      <MenuItem key={value as string} value={value as string}>
        {label || (value as string)}
      </MenuItem>
    ))}
  </Select>
);
