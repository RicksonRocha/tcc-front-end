import { Controller, useFormContext } from 'react-hook-form';

import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  required = false,
  itemProps,
  disabled,
  ...other
}) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel
              component="legend"
              id={labelledby}
              sx={{ typography: 'body2' }}
              required={required}
            >
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                disabled={disabled}
                sx={{
                  '&:not(:last-of-type)': {
                    mb: spacing || 0,
                  },
                  ...(row && {
                    mr: 0,
                    '&:not(:last-of-type)': {
                      mr: spacing || 2,
                    },
                  }),
                  ...itemProps,
                }}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
