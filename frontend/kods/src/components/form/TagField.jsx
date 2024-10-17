import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const TagField = ({
  dataArray = [],
  data = "",
  punctuation = "",
  isInput = false,
  name = "",
  label = "",
  rules = null,
  defaultValue = "",
  disabled = false,
  placeholder = "",
  fullWidth = false,
  className = null,
  size = "small",
  isHidden = false,
  ...props
}) => {
  const { control, setValue, getValues } = useFormContext();
  const [listArray, setListArray] = useState(dataArray);
  const [listValue, setListValue] = useState([]);
  const [newValue, setNewValue] = useState("");
  const rawString = data ? data : getValues(name);
  const { enqueueSnackbar } = useSnackbar();

  const ScrollableGridItem = styled(Grid)(({ theme }) => ({
    overflowY: "auto",
  }));

  const parseStringToList = (data, punctuation) => {
    const list = data
      .split(punctuation)
      .map((item) => item.trim())
      .filter(Boolean);
    return list;
  };
  useEffect(() => {
    dataArray.length > 0 && setListArray(dataArray);
  }, [dataArray]);

  useEffect(() => {
    if (rawString) {
      const parsedList = parseStringToList(rawString, punctuation);
      setListValue(parsedList);
    }
  }, [rawString, punctuation]);

  useEffect(() => {
    if (isInput) {
      const convertListToString = listValue.join(punctuation);
      setValue(name, convertListToString);
    }
  }, [listValue, punctuation, name, setValue, isInput]);

  const addValue = () => {
    if (newValue != "") {
      setListValue([...listValue, newValue]);
      setNewValue("");
    }
  };

  const removeValue = (index) => {
    const updatedList = [...listValue];
    updatedList.splice(index, 1);
    setListValue(updatedList);
  };

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
          <Grid container>
            {isInput && (
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={9}>
                  <TextField
                    {...field}
                    {...props}
                    size="small"
                    id={field.name}
                    disabled={disabled}
                    error={Boolean(fieldState.error)}
                    helpertext={
                      fieldState.invalid
                        ? fieldState.error.message
                        : props.helperText
                    }
                    label={label}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    fullWidth
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    onClick={addValue}
                    style={{ height: "100%" }}
                  >
                    Thêm
                  </Button>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <ScrollableGridItem>
                <Stack direction="row" spacing={1} m={1}>
                  {listValue.map((value, index) => (
                    <Chip
                      key={index}
                      label={value}
                      onDelete={isInput ? () => removeValue(index) : undefined}
                    />
                  ))}
                  {listArray.map((value, index) => (
                    <Chip key={index} label={value} />
                  ))}
                </Stack>
              </ScrollableGridItem>
            </Grid>
          </Grid>

          <FormHelperText variant="filled">
            {fieldState.error && fieldState.error.message}
          </FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default TagField;
