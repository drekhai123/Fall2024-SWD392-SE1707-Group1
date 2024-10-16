/* eslint-disable react/prop-types */
import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const SwitchField = ({
  name,
  label,
  size = 'small',
  fullWidth = false,
  rules = null,
  defaultValue = false,
  className = null,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControlLabel
          error={Boolean(fieldState.error)}
          className={className}
          size={size}
          label={label}
          control={<Switch checked={field.value} name={name} />}
          {...field}
          {...props}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default SwitchField;
