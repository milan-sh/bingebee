import { TabsContent } from "../ui/tabs";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { UpdatePassword } from "@/interfaces/profile";
import { requestHandler } from "@/utils";
import { UpdatePasswordData } from "@/api/profile";
import { toast } from "sonner";

const PasswordTab = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<UpdatePassword>();
  const [loading, setLoading] = useState(false);
  const newPasswrod = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: UpdatePassword) => {
    if (confirmPassword && newPasswrod && newPasswrod !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }
    console.log(data)

    await requestHandler(
      async () => await UpdatePasswordData(data),
      setLoading,
      () => toast.success("Password updated successfully."),
      (err) => toast.error(err || "something went wrong.")
    );
  };

  return (
    <TabsContent value="changePswd" className="grid md:grid-cols-3 gap-4 py-4">
      <div>
        <h1 className="font-semibold text-lg">Password</h1>
        <p className="text-gray-400 text-[16px]">
          Please enter your current password to change your password.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:col-span-2 border rounded-lg"
      >
        <div className="p-4">
          <Input
            type="password"
            label="Current password"
            {...register("oldPassword", {
              required: "Current password is required",
            })}
            className="rounded-lg"
          />
          {errors.oldPassword && (
            <p className="text-red-600">{errors.oldPassword.message}</p>
          )}
          <div className="flex flex-col mb-4">
            <Input
              type="password"
              id="email"
              label="New password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: 8,
              })}
              className="rounded-lg"
            />
            {errors.newPassword && (
              <p className="text-red-600">{errors.newPassword.message}</p>
            )}
            <p className="text-gray-400">
              Your new password must be more than 8 characters.
            </p>
          </div>
          <Input
            type="password"
            label="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
            className="rounded-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
        <hr className="h-0.5 bg-white" />
        <div className="flex items-center justify-end gap-4 p-4">
          <button
            type="submit"
            className="px-4 py-1.5 bg-primary text-black cursor-pointer"
            disabled={loading}
          >
            {loading ? "Updating password..." : "Update Password"}
          </button>
        </div>
      </form>
    </TabsContent>
  );
};

export default PasswordTab;
