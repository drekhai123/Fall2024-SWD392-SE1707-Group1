/* eslint-disable react/prop-types */
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RadioGroupField = (props) => {
  const {
    xs,
    name,
    label,
    size,
    children,
    fullWidth,
    rules,
    disabled,
    defaultValue = '',
    options,
    className,
    ...others
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          component="fieldset"
          error={Boolean(fieldState.error)}
          className={className}
          fullWidth={fullWidth}
          size={size}
          disabled={disabled}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup name={name} {...field} value={`${field.value}`} {...others}>
            {children ??
              options?.map(({ label, value, id }) => (
                <Grid item xs={xs} key={id}>
                  <FormControlLabel
                    key={`${name}-radio-${value}`}
                    value={value}
                    control={<Radio size="small" />}
                    label={label}
                  />
                </Grid>
              ))}
          </RadioGroup>
          <FormHelperText>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default RadioGroupField;
