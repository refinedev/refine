import React from "react";
import { HttpError } from "@refinedev/core";
import { CreateButton } from "@refinedev/mui";

import {
    TextField,
    MenuItem,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
} from "@mui/material";

import { useModalForm } from "@refinedev/react-hook-form";

import { RefineWithoutLayout } from "../../../.storybook/preview";
import { IPost } from "interfaces";

export default {
    title: "Hooks / Modal Form",
    decorators: [(Story: React.FC) => RefineWithoutLayout(Story)],
};

export const CreateForm: React.FC = () => {
    const {
        modal: { visible, close, show, title },
        saveButtonProps,
        register,
        formState: { errors },
    } = useModalForm<IPost, HttpError, IPost>({
        refineCoreProps: { action: "create" },
    });

    return (
        <>
            <CreateButton onClick={() => show()} />
            <Dialog open={visible} onClose={close}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        {...register("title", { required: true })}
                        error={!!errors?.title}
                        helperText={errors?.title?.message}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                    />
                    <FormControl
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors?.status}
                    >
                        <InputLabel id="status">Age</InputLabel>
                        <Select
                            {...register("status")}
                            labelId="status"
                            label="Status"
                            defaultValue="published"
                        >
                            <MenuItem value="published">Published</MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                        {errors?.status && (
                            <FormHelperText>
                                {errors?.status?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <TextField
                        {...register("content", { required: true })}
                        error={!!errors?.content}
                        helperText={errors?.content?.message}
                        margin="normal"
                        label="Content"
                        required
                        multiline
                        rows={4}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button {...saveButtonProps}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
