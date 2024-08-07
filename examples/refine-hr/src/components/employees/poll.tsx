import { useState } from "react";
import { useList } from "@refinedev/core";
import { Frame } from "@/components/frame";
import { PollForm } from "@/components/poll/form";
import { PollResult } from "@/components/poll/result";
import { PollsIcon } from "@/icons";
import { type PollAnswer, PollStatus, type Poll } from "@/types";

export const EmployeePoll = () => {
  const [selectedPollAnswerOptionId, setSelectedPollAnswerOptionId] = useState<
    PollAnswer["optionId"] | null
  >(null);

  const { data: dataPolls, isLoading: isLoadingPoll } = useList<
    Poll & {
      answers: PollAnswer[];
    }
  >({
    resource: "polls",
    // there is only one active poll at a time. So we only need one.
    pagination: { pageSize: 1 },
    filters: [
      {
        field: "status",
        operator: "eq",
        value: PollStatus.ACTIVE,
      },
    ],
    meta: {
      join: ["answers"],
    },
  });
  const poll = dataPolls?.data[0];

  const loading = !dataPolls || isLoadingPoll;

  return (
    <Frame title="Poll" icon={<PollsIcon width={24} height={24} />}>
      {selectedPollAnswerOptionId ? (
        <PollResult
          poll={poll}
          loading={loading}
          selectedPollAnswerOptionId={selectedPollAnswerOptionId}
        />
      ) : (
        <PollForm
          poll={poll}
          loading={loading}
          onSubmit={(values) => setSelectedPollAnswerOptionId(values.optionId)}
        />
      )}
    </Frame>
  );
};
