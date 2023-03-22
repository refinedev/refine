import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const RememeberMe = () => {
    const { register } = useFormContext();

    return (
        <FormControlLabel
            sx={{
                span: {
                    fontSize: "12px",
                },
            }}
            control={
                <Checkbox
                    size="small"
                    id="rememberMe"
                    {...register("rememberMe")}
                />
            }
            label="Remember me"
        />
    );
};
