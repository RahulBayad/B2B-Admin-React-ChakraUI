import { Spinner } from "@chakra-ui/react";

const Loading = ({ fullPage = false }: { fullPage?: boolean }) => {
  if (!fullPage) {
    return (
      <div className="flex items-center justify-center h-20 w-full">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center h-full absolute w-full">
      <Spinner />
    </div>
  )
};

export default Loading;
