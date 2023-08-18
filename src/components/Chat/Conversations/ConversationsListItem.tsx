import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import React, { useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { formatUsernames } from "../../../util/functions";
import { ConversationPopulated } from "../../../../../backend/src/util/types";

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
};

interface ConversationItemProps {
  userId: string;
  conversation: ConversationPopulated;
  onClick: () => void;
  onEditConversation?: () => void;
  hasSeenLatestMessage?: boolean | undefined;
  selectedConversationId?: string;
  onDeleteConversation: (conversationId: string) => void;
  onLeaveConversation?: (conversation: ConversationPopulated) => void;
  isSelected: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  userId,
  conversation,
  selectedConversationId,
  hasSeenLatestMessage,
  onClick,
  onEditConversation,
  onDeleteConversation,
  onLeaveConversation,
  isSelected,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
      onClick();
    } else if (event.type === "contextmenu") {
      event.preventDefault();
      setMenuOpen(true);
    }
  };

  // const showMenu =
  //   onEditConversation && onDeleteConversation && onLeaveConversation;

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={
        conversation.id === selectedConversationId ? "whiteAlpha.200" : "none"
      }
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      {menuOpen && (
        <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          <MenuList bg="#2d2d2d">
            <MenuItem
              icon={<AiOutlineEdit fontSize={20} />}
              onClick={(event) => {
                event.stopPropagation();
                // onEditConversation();
              }}
              bg="#2d2d2d"
              _hover={{ bg: "whiteAlpha.300" }}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<MdDeleteOutline fontSize={20} />}
              onClick={(event) => {
                event.stopPropagation();
                onDeleteConversation(conversation.id);
              }}
              bg="#2d2d2d"
              _hover={{ bg: "whiteAlpha.300" }}
            >
              Delete
            </MenuItem>
            {/* {conversation.participants.length > 2 ? (
              <MenuItem
                icon={<BiLogOut fontSize={20} />}
                onClick={(event) => {
                  event.stopPropagation();
                  onLeaveConversation(conversation);
                }}
              >
                Leave
              </MenuItem>
            ) : (
              <MenuItem
                icon={<MdDeleteOutline fontSize={20} />}
                onClick={(event) => {
                  event.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
              >
                Delete
              </MenuItem>
            )} */}
          </MenuList>
        </Menu>
      )}
      <Flex position="relative" left="-6px">
        {hasSeenLatestMessage === false && (
          <BsFillChatRightDotsFill fontSize={18} color="#6B46C1" />
        )}
      </Flex>
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants, userId)}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text
          color="whiteAlpha.700"
          textAlign="right"
          position="absolute"
          right={4}
        >
          {formatRelative(new Date(conversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </Flex>
    </Stack>
  );
};
export default ConversationItem;
