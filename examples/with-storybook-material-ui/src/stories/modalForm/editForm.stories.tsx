import React from "react";
import type { HttpError } from "@refinedev/core";
import { EditButton } from "@refinedev/mui";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import { useModalForm } from "@refinedev/react-hook-form";

import { RefineWithoutLayout } from "../../../.storybook/preview";
import type { IPost } from "../../interfaces";

export default {
  title: "Hooks / Modal Form",
  decorators: [(Story: React.FC) => RefineWithoutLayout(Story)],
};

export const EditForm: React.FC = () => {
  const {
    modal: { visible, close, show, title },
    saveButtonProps,
    register,
    formState: { errors },
  } = useModalForm<IPost, HttpError, IPost>({
    refineCoreProps: { action: "edit" },
  });

  return (
    <>
      <EditButton onClick={() => show(1)} />
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
              <FormHelperText>{errors?.status?.message}</FormHelperText>
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
