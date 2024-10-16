/* eslint-disable react/prop-types */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const SelectField = ({
  name,
  label,

  ...props
}) => {
  const {
    options = null,
    children = null,
    size = "small",
    fullWidth = false,
    rules = null,
    disabled = false,
    className = null,
    multiple = false,
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          error={Boolean(fieldState.error)}
          className={className}
          fullWidth={fullWidth}
          size={size}
          disabled={disabled}
          required={props.required}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            multiple={multiple}
            id={name}
            helperText={
              fieldState.error ? fieldState.error.message : props.helperText
            }
            label={label}
            {...field}
            {...props}
            error={Boolean(fieldState.error)}
            value={field.value !== undefined ? field.value : multiple ? [] : ""}
          >
            {children ??
              options?.map(({ label, value, id }) => (
                <MenuItem value={value} key={`${id}`}>
                  {label}
                </MenuItem>
              ))}
            {!children && !options?.length && (
              <MenuItem value="" disabled key={`${name}-select-empty`}>
                Trống
              </MenuItem>
            )}
          </Select>
          <FormHelperText>
            {fieldState.error && fieldState.error.message}
          </FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      defaultValue={multiple ? [] : ""}
      rules={rules}
    />
  );
};

export default SelectField;
