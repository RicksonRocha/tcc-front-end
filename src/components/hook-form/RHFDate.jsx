import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';

export function RHFDate({ name, native, helperText, label, required, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={label}
          renderInput={(props) => (
            <TextField
              {...props}
              {...other}
              size={other.size ? other.size : 'small'}
              fullWidth
              required={required}
              error={!!error}
              helperText={error ? error?.message : helperText}
            />
          )}
        />
      )}
    />
  );
}

export function RHFTime({ name, native, helperText, children, label, ...other }) {
  const { control, watch, setValue, register } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          label={label}
          value={watch(name)}
          onChange={(e) => {
            setValue(name, e);
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              fullWidth
              required
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...field}
              {...register(name, {
                onChange: (e) => setValue(name, e),
              })}
            />
          )}
        />
      )}
    />
  );
}
export function RHFDateTime({ name, native, helperText, children, label, ...other }) {
  const { control, watch, setValue, register } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          label={label}
          value={watch(name)}
          onChange={(e) => {
            setValue(name, e);
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              fullWidth
              required
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...field}
              {...register(name, {
                onChange: (e) => setValue(name, e),
              })}
            />
          )}
        />
      )}
    />
  );
}
