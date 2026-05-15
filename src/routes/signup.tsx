import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signupSchema, type SignupData } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/hooks/user/useSignup";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const { mutate: signup, isPending, error } = useSignup();

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    // Handle form submission
    signup(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account on BingeBee
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    {...register("fullName")}
                    placeholder="Your full name"
                    required
                  />
                </Field>
                {errors.fullName && (
                  <FieldDescription className="text-destructive">
                    {errors.fullName.message}
                  </FieldDescription>
                )}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="m@example.com"
                    required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you.
                  </FieldDescription>
                </Field>
                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    {...register("username")}
                    type="text"
                    placeholder="your-username"
                    required
                  />
                </Field>
                {errors.username && (
                  <FieldDescription className="text-destructive">
                    {errors.username.message}
                  </FieldDescription>
                )}
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    required
                  />
                </Field>
                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...register("confirmPassword")}
                    id="confirm-password"
                    type="password"
                    required
                  />
                </Field>
                {errors.confirmPassword && (
                  <FieldDescription className="text-destructive">
                    {errors.confirmPassword.message}
                  </FieldDescription>
                )}
                <FieldGroup>
                  {error && (
                    <FieldDescription className="text-destructive">
                      {error.message}
                    </FieldDescription>
                  )}
                  <Field>
                    <Button disabled={!isValid || isPending} type="submit">
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                    {/* <Button variant="outline" type="button">
                      Sign up with Google
                    </Button> */}
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <Link to="/login">Sign in</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
