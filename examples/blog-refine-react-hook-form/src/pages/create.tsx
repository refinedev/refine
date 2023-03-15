import React from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormValue {
    firstname: string;
    lastname: string;
    address: string;
    number: number;
    work: string;
    company: string;
    role: string;
}

const defaultValues = {
    firstname: "",
    lastname: "",
    address: "",
    number: 0,
    work: "unemployed",
    company: "",
    role: "",
};

const schema = Yup.object().shape({
    firstname: Yup.string()
        .label("First Name")
        .trim()
        .required()
        .min(3)
        .max(64),
    lastname: Yup.string().label("Last Name").trim().required().min(3).max(64),
    address: Yup.string().label("Address").trim().required().min(3),
    number: Yup.number().label("Number").required(),
    work: Yup.string().label("Work").oneOf(["unemployed", "employed"]),
    company: Yup.string().when("work", {
        // eslint-disable-next-line
        is: (val: any) => val === "employed",
        then: Yup.string().label("Company").required().min(3).max(64),
    }),
    role: Yup.string().when("work", {
        // eslint-disable-next-line
        is: (val: any) => val === "employed",
        then: Yup.string().label("Role").required().min(3).max(64),
    }),
});

const Create: React.FC = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormValue>({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const type = watch("work");

    // eslint-disable-next-line
    const handleSubmission = (data: any) => console.log(data);

    return (
        <form
            onSubmit={handleSubmit(handleSubmission)}
            style={{ display: "flex", flexDirection: "column" }}
        >
            <Controller
                control={control}
                name="firstname"
                render={({ field }) => (
                    <TextField
                        fullWidth
                        {...field}
                        sx={{ maxWidth: 600 }}
                        label="First Name"
                        margin="dense"
                        required
                        error={!!errors.firstname}
                        helperText={
                            errors.firstname && `${errors.firstname.message}`
                        }
                    />
                )}
            />
            <Controller
                control={control}
                name="lastname"
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ maxWidth: 600 }}
                        label="Last Name"
                        margin="dense"
                        required
                        error={!!errors.lastname}
                        helperText={
                            errors.lastname && `${errors.lastname.message}`
                        }
                    />
                )}
            />
            <Controller
                control={control}
                name="address"
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ maxWidth: 600 }}
                        label="Address"
                        margin="dense"
                        required
                        error={!!errors.address}
                        helperText={
                            errors.address && `${errors.address.message}`
                        }
                    />
                )}
            />
            <Controller
                control={control}
                name="number"
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ maxWidth: 600 }}
                        label="Number"
                        margin="dense"
                        required
                        type="number"
                        error={!!errors.number}
                        helperText={errors.number && `${errors.number.message}`}
                    />
                )}
            />
            <FormControl sx={{ marginTop: 1, marginBottom: 0.7 }} required>
                <InputLabel id="type-label">Work</InputLabel>
                <Controller
                    control={control}
                    name="work"
                    render={({ field }) => (
                        <Select
                            sx={{ maxWidth: 600 }}
                            margin="dense"
                            {...field}
                            type="select"
                            labelId="type-label"
                            label="Work"
                        >
                            <MenuItem value="employed">Employed</MenuItem>
                            <MenuItem value="unemployed">Unemployed</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>
            {type === "employed" && (
                <>
                    <Controller
                        control={control}
                        name="company"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                sx={{ maxWidth: 600 }}
                                label="Company"
                                margin="dense"
                                required
                                error={!!errors.company}
                                helperText={
                                    errors.company &&
                                    `${errors.company.message}`
                                }
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                sx={{ maxWidth: 600 }}
                                label="Role"
                                margin="dense"
                                required
                                error={!!errors.role}
                                helperText={
                                    errors.role && `${errors.role.message}`
                                }
                            />
                        )}
                    />
                </>
            )}
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    maxWidth: "600px",
                    padding: "10px",
                    backgroundColor: "#67BE23",
                    color: "white",
                    marginTop: "5px",
                }}
            >
                Submit
            </Button>
        </form>
    );
};

export default Create;
