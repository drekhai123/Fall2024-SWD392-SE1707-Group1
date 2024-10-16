/* eslint-disable react/prop-types */
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const DatePickerField = ({
  name,
  label,
  defaultValue = "",
  transform,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          renderInput={(params) => (
            <TextField {...params} {...props} error={false} />
          )}
          {...field}
          onChange={(e) => field.onChange(transform ? transform.output(e) : e)}
        />
      )}
      name={name}
    />
  );
};

export default DatePickerField;
