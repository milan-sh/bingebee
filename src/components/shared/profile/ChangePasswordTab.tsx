import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordData,
} from "@/schemas/profile.schema";
import { useChangePassword } from "@/hooks/user/useChangePassword";

const ChangePasswordTab = () => {
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordData> = ({
    oldPassword,
    newPassword,
  }) => {
    changePassword(
      { oldPassword, newPassword },
      { onSuccess: () => reset() },
    );
  };

  return (
    <TabsContent value="password">
      <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="font-semibold">Password</h2>
          <p className="text-muted-foreground">
            Please enter your current password to change your password.
          </p>
        </div>
        <div className="border rounded-lg md:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="p-4">
              <Field data-invalid={!!errors.oldPassword}>
                <FieldLabel htmlFor="current-password" className="font-semibold">
                  Current Password
                </FieldLabel>
                <Input
                  id="current-password"
                  type="password"
                  aria-invalid={!!errors.oldPassword}
                  {...register("oldPassword")}
                />
                <FieldError errors={[errors.oldPassword]} />
              </Field>
              <Field data-invalid={!!errors.newPassword}>
                <FieldLabel htmlFor="new-password" className="font-semibold">
                  New Password
                </FieldLabel>
                <Input
                  id="new-password"
                  type="password"
                  aria-invalid={!!errors.newPassword}
                  {...register("newPassword")}
                />
                {errors.newPassword ? (
                  <FieldError errors={[errors.newPassword]} />
                ) : (
                  <FieldDescription>
                    Your new password must be more than 8 characters.
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirm-password" className="font-semibold">
                  Confirm New Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
                <FieldError errors={[errors.confirmPassword]} />
              </Field>
            </FieldGroup>
            <Separator className="h-3 my-4" />
            <Button
              type="submit"
              disabled={isPending}
              className="mb-2 mx-2 float-right"
            >
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </TabsContent>
  );
};

export default ChangePasswordTab;
