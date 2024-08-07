import { Box, Typography, styled } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import type { Poll, PollAnswer } from "@/types";
import { useMemo } from "react";
import { CheckRectangleIcon } from "@/icons";

type Props = {
  poll?: Poll & {
    answers: PollAnswer[];
  };
  selectedPollAnswerOptionId?: PollAnswer["optionId"];
  loading?: boolean;
};

export const PollResult = (props: Props) => {
  const aggregatedAnswers = useMemo(() => {
    let mostVotedAnswer = 0;

    if (!props.poll?.answers || !props.poll?.options) {
      return [];
    }

    const answers = props.poll.options
      .map((option) => {
        const totalVotes =
          props.poll?.answers.filter((answer) => answer.optionId === option.id)
            .length || 0;

        if (totalVotes > mostVotedAnswer) {
          mostVotedAnswer = totalVotes;
        }

        return {
          optionId: option.id,
          optionText: option.text,
          totalVotes,
        };
      })
      // calculate percentage. mostVotedAnswer is the 100%
      .map((answer) => ({
        ...answer,
        percentage: (answer.totalVotes / (mostVotedAnswer || 1)) * 100,
      }));

    // sort by total votes
    answers.sort((a, b) => b.totalVotes - a.totalVotes);

    return answers;
  }, [props.poll]);

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          color: "text.primary",
        }}
      >
        {props.poll?.question}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "8px",
        }}
      >
        {aggregatedAnswers.map((answer) => {
          return (
            <Box
              key={answer.optionId}
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    gap: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "8px",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) =>
                        answer.percentage === 100
                          ? theme.palette.common.white
                          : theme.palette.text.primary,
                    }}
                  >
                    {answer.optionText}
                  </Typography>
                  {props.selectedPollAnswerOptionId === answer.optionId && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: (theme) =>
                          answer.percentage === 100
                            ? theme.palette.common.white
                            : theme.palette.text.primary,
                      }}
                    >
                      <CheckRectangleIcon />
                    </Box>
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "8px",
                    zIndex: 1,
                    color: (theme) =>
                      answer.percentage === 100
                        ? theme.palette.common.white
                        : theme.palette.text.secondary,
                  }}
                >
                  {answer.totalVotes}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  sx={{
                    height: "24px",
                    borderRadius: "24px",
                    "&.MuiLinearProgress-colorPrimary": (theme) => ({
                      backgroundColor: theme.palette.grey[50],
                    }),
                    "& .MuiLinearProgress-bar": (theme) => ({
                      borderRadius: "24px",
                      backgroundColor:
                        answer.percentage === 100
                          ? theme.palette.primary.main
                          : theme.palette.grey[200],
                    }),
                  }}
                  value={answer.percentage}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
      <Typography
        variant="body2"
        sx={{
          marginTop: "36px",
          color: "text.secondary",
        }}
      >
        {props.poll?.answers.length} votes
      </Typography>
    </Box>
  );
};
