import type { Feedback } from "@/interfaces/user";
import Button from "./Button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { requestHandler } from "@/utils";
import { SendFeedback } from "@/api/profile";
import { toast } from "sonner";

const SheetContentCom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Feedback>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async(data: Feedback) => {
    await requestHandler(
      async()=> await SendFeedback(data),
      setLoading,
      ()=>{
        toast.success("Feedback sent successfully.")
        reset()
      },
      (err)=> toast.error(err || "something went wrong.")
    )
  };

  return (
    <SheetContent className="bg-neutral-800 text-white">
      <SheetHeader>
        <SheetTitle className="md:text-xl">
          Send feedback to{" "}
          <a
            href="https://dev-milan-ten.vercel.app/"
            target="_blank"
            className="text-primary underline"
          >
            Milan
          </a>
        </SheetTitle>
        <SheetDescription className="text-gray-200">
          We value your feedback. How can we improve your experience?
        </SheetDescription>
      </SheetHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 h-full relative">
        <label htmlFor="feedback" className="font-semibold">
          Describe your feedback (required)
        </label>
        <textarea
          {...register("feedback", {
            required: "Feedback message is required.",
            minLength: 10,
          })}
          id="feedback"
          className="border w-full rounded-sm mt-4 p-2 resize-none"
          placeholder="Type feedback..."
          rows={10}
        />
        <p className="text-gray-400 text-sm mt-1">Feedback must be more than 10 characters.</p>
        {errors.feedback && (
          <p className="text-red-600 mt-1">{errors.feedback.message}</p>
        )}
        <SheetFooter>
          <div className="w-full absolute bottom-0 inset-x-0 flex justify-end">
            <Button type="submit" disabled={loading} className="disabled:bg-primary/60">{loading? "Sending..." : "Send"}</Button>
          </div>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default SheetContentCom;
