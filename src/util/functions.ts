import { ParticipantPopulated } from "../../../backend/src/util/types";

export const formatUsernames = (
  participants: Array<ParticipantPopulated>,
  myUserId: string
): string => {
  const username = participants
    .filter((participant) => participant.user.id != myUserId)
    .map((participant) => participant.user.username);

  return username.join(", ");
};
