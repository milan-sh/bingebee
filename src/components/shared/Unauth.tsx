import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { CircleUserRound, type LucideIcon } from "lucide-react";

type UnauthProps = {
  Icon: LucideIcon;
  message: string;
};

const Unauth = ({ Icon, message = "" }: UnauthProps) => {
  return (
    <div className="min-h-[60vh] flex flex-col gap-4 items-center justify-center">
      <Icon className="size-10 sm:size-20 mb-4"/>
      <p className="text-sm sm:text-lg font-medium">{message}</p>
      <Button
        className="rounded-full px-4 text-primary font-medium"
        variant={"outline"}
      >
        <CircleUserRound strokeWidth={2.4} />
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
};

export default Unauth;
