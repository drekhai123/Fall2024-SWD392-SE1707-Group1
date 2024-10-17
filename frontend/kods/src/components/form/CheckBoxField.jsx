/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const CheckBoxField = ({ name, label, rules = null, defaultValue = false, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControlLabel
          {...props}
          control={
            <Checkbox
              helperText={fieldState.error ? fieldState.error.message : props.helperText}
              {...field}
              error={Boolean(fieldState.isTouched && fieldState.error)}
              inputRef={field.ref}
              icon={props.icon}
              checkedIcon={props.checkedIcon}
            />
          }
          label={label}
        />
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default CheckBoxField;
