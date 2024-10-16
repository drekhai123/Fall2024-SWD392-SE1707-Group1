/* eslint-disable react/prop-types */
// import { Checkbox, FormControlLabel } from '@mui/material';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const CheckBoxGroupField = ({
  name,
  value = [],
  options = [],
  rules = null,
  xs = 0,
  defaultValue = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <>
          {options.map((item, index) => {
            const isChecked = field.value?.includes(item.value || item);
            return (
              <Grid item xs={xs} key={index}>
                <FormControlLabel
                  {...props}
                  key={item.value || item}
                  control={
                    <Checkbox
                      helperText={fieldState.error ? fieldState.error.message : props.helperText}
                      {...field}
                      error={Boolean(fieldState.isTouched && fieldState.error)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const updatedValue = [...(field.value ?? []), item.value ?? item];
                          field.onChange(updatedValue);
                        } else {
                          const updatedValue = [...(field.value ?? [])].filter(
                            (x) => x !== (item.value ?? item)
                          );
                          field.onChange(updatedValue);
                        }
                      }}
                      inputRef={field.ref}
                      icon={props.icon}
                      checkedIcon={props.checkedIcon}
                      checked={isChecked}
                      value={value}
                    />
                  }
                  label={item.label || item}
                />
              </Grid>
            );
          })}
        </>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default CheckBoxGroupField;
