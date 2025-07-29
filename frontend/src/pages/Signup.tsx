import { useForm } from "react-hook-form";
import type { SignupFormValues } from "../interfaces/form";
import { Input } from "../components/index";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormValues>();

  const onSubmit = (data: SignupFormValues) => {
    const avatar = data.avatar?.[0]
    const coverImage = data.coverImage?.[0]

    console.log({...data, avatar, coverImage});
    reset();
  };
  return (
    <div className="bg-black text-white flex items-center justify-center py-8">
      <form
        className="md:w-2xl flex flex-col gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-0.5">
          <Input
            label="Full Name"
            type="text"
            {...register("fullName", { required: "Full name is required", minLength:{value:2, message:"Min 2 chars"} })}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}.</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <Input
            type="email"
            label="Email"
            {...register("email", { required: "Email is required", pattern: {value: /^\S+@\S+$/i, message:"Invalid email"} })}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}.</p>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Input
            label="Username"
            type="text"
            {...register("username", { required: "Username is required", minLength:{value:3, message:"Min 3 chars"} })}
            placeholder="username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}.</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <Input
            label="Password"
            type="password"
            {...register("password", { required: "Password is required.", minLength:{value:6, message:"Min 6 chars."} })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Input
            label="Avatar"
            type="file"
            accept="image/*"
            {...register("avatar", { required: "Avatar image is required", validate: files=> files && files.length===1 || "Please upload 1 image" })}
          />
          {errors.avatar && <p className="text-red-500">{errors.avatar.message as string}.</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Input label="CoverImage (Optional)" type="file" accept="image/*" {...register("coverImage")} />
        </div>
        <Button 
        type="submit"
        className="w-full rounded-none py-5 cursor-pointer text-lg hover:bg-accent-foreground mt-3">
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Signup;
