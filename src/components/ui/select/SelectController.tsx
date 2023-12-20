import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

type SelectControllerProps<T extends FieldValues = any> = {
  control: Control<T>;
  name: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  defaultItemLabel?: string;
  noDefaultItem?: boolean;
} & SelectProps;

const SelectController = ({
  control,
  name,
  options,
  label,
  disabled,
  readOnly,
  onChange,
  inputProps,
  defaultItemLabel = "Select Option",
  noDefaultItem = false,
  ...restProps
}: SelectControllerProps) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id={`${name}-label`} shrink>
        {label}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error, invalid } }) => (
          <>
            <Select
              {...restProps}
              {...field}
              fullWidth
              label={label}
              labelId={`${name}-label`}
              inputProps={{
                readOnly: readOnly,
                ...(inputProps ? inputProps : {}),
              }}
              error={invalid}
              notched
              onChange={(...args) => {
                field.onChange(...args);
                onChange && onChange(...args);
              }}
            >
              {!noDefaultItem && (
                <MenuItem value="">{defaultItemLabel}</MenuItem>
              )}
              {(options || []).map((option) => (
                <MenuItem
                  key={`${name}-${option.value}`}
                  value={option.value}
                  disabled={option?.disabled}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};

export default SelectController;
