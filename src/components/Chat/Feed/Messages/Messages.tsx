import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import { MessagesData, MessagesVariables } from "../../../../util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { toast } from "react-hot-toast";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Query.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && (
        <Stack>
          <span>loading...</span>
        </Stack>
      )}
      {data?.messages && (
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
          {data.messages.map((message) => (
            // <MessageItem />
            <>{message.body}</>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
