import { RiErrorWarningLine } from "react-icons/ri";

export const Message = ({ message }: { message: string }) => {
  return (
    <div className="p-5">
      <p className="flex flex-col items-center justify-center gap-5 px-5 py-10 mt-10 bg-gray-300/80 rounded-2xl">
        <span className="text-orange-400">
          <RiErrorWarningLine size={50} />
        </span>
        <span className="font-bold text-orange-500/80 text-md 2xl:text-lg">
          {message}
        </span>
      </p>
    </div>
  );
};
