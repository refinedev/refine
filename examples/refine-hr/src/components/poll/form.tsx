import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import {
  FormControl,
  FormLabel,
  Skeleton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import type { Poll, PollAnswer } from "@/types";

type FormValues = {
  optionId: Poll["options"][number]["id"];
};

type Props = {
  poll?: Poll;
  loading?: boolean;
  onSubmit?: (values: FormValues) => void;
};

export const PollForm = (props: Props) => {
  const {
    handleSubmit,
    refineCore: { query, onFinish },
    register,
    watch,
  } = useForm<PollAnswer, HttpError, FormValues>({
    refineCoreProps: {
      resource: "poll-answers",
      action: "create",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      optionId: Number(values.optionId),
    };

    // await onFinish(payload);
    props.onSubmit?.(payload);
  };

  const loading = !props.poll || props.loading;

  return (
    <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormLabel
        id="poll-label"
        sx={{
          minWidth: "300px",
          width: "100%",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          color: "text.primary",
        }}
      >
        {loading ? (
          <Skeleton variant="text" width="100%" />
        ) : (
          props.poll?.question
        )}
      </FormLabel>
      <RadioGroup
        aria-labelledby="poll-label"
        name="poll"
        sx={{
          width: "100%",
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio size="small" />}
                disableTypography
                label={<Skeleton variant="text" width="80%" />}
              />
            ))
          : props.poll?.options.map((option) => {
              return (
                <FormControlLabel
                  value={option.id}
                  label={option.text}
                  control={<Radio size="small" />}
                  disabled={loading}
                  key={option.id}
                  checked={Number(watch("optionId")) === Number(option.id)}
                  {...register("optionId", {
                    valueAsNumber: true,
                    required: "This field is required",
                  })}
                />
              );
            })}
      </RadioGroup>
      <Button
        type="submit"
        color="secondary"
        sx={{
          mt: "24px",
        }}
        disabled={loading}
      >
        Submit
      </Button>
    </FormControl>
  );
};
