/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AutoCompleteField = ({
  name,
  label,
  rules = {},
  defaultValue = '',
  placeholder = '',
  ...props
}) => {
  const { control } = useFormContext();
  const { transformValue, multiple } = props;

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          value={field.value ? field.value : multiple ? [] : null}
          label={label}
          onChange={(event, newValue) => {
            const updateValue = transformValue ? transformValue(newValue) : newValue;
            field.onChange(updateValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...props}
              variant="outlined"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              label={label}
              placeholder={placeholder}
              disabled={props.disabled}
            />
          )}
          {...props}
        />
      )}
      name={name}
      control={control}
      defaultValue={multiple ? [] : ''}
      rules={rules}
    />
  );
};

export default AutoCompleteField;
