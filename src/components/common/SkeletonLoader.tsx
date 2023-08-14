import { Skeleton } from "@chakra-ui/react";

interface SkeletonLoaderProps {
  count: number;
  hight: string;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count,
  hight,
  width,
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          startColor="blackAlpha.300"
          endColor="whiteAlpha.400"
          height={hight}
          width={{ base: "full" }}
          borderRadius={4}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
