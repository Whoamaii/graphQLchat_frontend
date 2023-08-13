import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationalModal from "./Modal/Modal";
import { useState } from "react";
import ConversationItem from "./ConversationsListItem";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { useRouter } from "next/router";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start conversation
        </Text>
      </Box>
      <ConversationalModal
        session={session}
        isOpen={isOpen}
        onClose={onClose}
      />
      {conversations.map((conversation) => (
        <ConversationItem
          onClick={() => onViewConversation(conversation.id)}
          key={conversation.id}
          userId={userId}
          conversation={conversation}
          isSelected={conversation.id === router.query.conversationId}
        ></ConversationItem>
      ))}
    </Box>
  );
};

export default ConversationList;
