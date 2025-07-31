import { useForm } from "react-hook-form";
import { Input } from "../components/index";
import type { LoginFormValues } from "../interfaces/form";
import { Button } from "@/components/ui/button";
import {useAuth} from "../context/AuthCotext"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const {login}  = useAuth()

  const onSubmit = async (data:LoginFormValues)=>{
    //log in user
    await login(data);
    reset();
  }
  return (
    <div className="bg-black text-white flex items-center justify-center py-8">
      <form className="md:w-2xl w-2xs flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-0.5">
          <Input
            label="Username"
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (<p className="text-red-600">{errors.username.message}.</p>)}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <Input
          label="Email"
          type="email"
          {...register("email", {required:"Email is required"})}
          />
          {errors.email && (<p className="text-red-600">{errors.email.message}.</p>)}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <Input
          label="Password"
          type="password"
          {...register("password", {required:"Password is required"})}
          />
          {errors.password && (<p className="text-red-600">{errors.password.message}.</p>)}
        </div>
        <Button className="rounded-none mt-3 text-lg py-5 cursor-pointer hover:bg-accent-foreground">Login</Button>
      </form>
    </div>
  );
};

export default Login;
