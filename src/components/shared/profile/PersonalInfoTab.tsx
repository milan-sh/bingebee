import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Loader2, Mail } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateAccountSchema,
  type UpdateAccountData,
} from "@/schemas/profile.schema";
import { useUpdateAccount } from "@/hooks/user/useUpdateAccount";
import { useUserStore } from "@/store/userStore";

const PersonalInfoTab = () => {
  const user = useUserStore((state) => state.user);
  const { mutate: updateAccount, isPending } = useUpdateAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateAccountData>({
    resolver: zodResolver(updateAccountSchema),
    values: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit: SubmitHandler<UpdateAccountData> = (data) => {
    updateAccount(data, {
      onSuccess: () => reset(data),
    });
  };

  return (
    <TabsContent value="personal-info">
      <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="font-semibold">Personal Information</h2>
          <p className="text-muted-foreground">Update your personal details.</p>
        </div>
        <div className="border rounded-lg md:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="p-4">
              <Field data-invalid={!!errors.fullName}>
                <FieldLabel htmlFor="name" className="font-semibold">
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
                <FieldError errors={[errors.fullName]} />
              </Field>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email" className="font-semibold">
                  Email Address
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  <InputGroupAddon>
                    <Mail size={16} className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={[errors.email]} />
              </Field>
            </FieldGroup>
            <Separator className="h-3 my-4" />
            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="mb-2 mx-2 float-right"
            >
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </TabsContent>
  );
};

export default PersonalInfoTab;
