import React from "react";
import { TextField as MuiTextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage, InputWrapper } from "./style";

interface FormTextFieldProps {
  name: string;
  label: string;
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  fullWidth = true,
  margin = "normal",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputWrapper>
          <MuiTextField
            {...field}
            fullWidth={fullWidth}
            margin={margin}
            label={label}
            error={!!errors[name]}
            helperText={errors[name] ? (errors[name]?.message as string) : ""}
          />
          {errors[name] && (
            <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
          )}
        </InputWrapper>
      )}
    />
  );
};

export default FormTextField;
