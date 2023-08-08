import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";
import { toast } from "react-hot-toast";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutation.createUsername);

  const onSubmit = async () => {
    try {
      if (!username) return;
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success("Username successfully created");

      /**
       * Reaload session when username has updated
       */
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
      console.log("submit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack alignItems="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit} isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text>MessengerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/img/googlelogo.png" />}
            >
              Sign In
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
