import { Mail } from "lucide-react";
import Input from "../Input";
import { TabsContent } from "../ui/tabs";
import { useForm } from "react-hook-form";
import type { UpdatePersonalInfo } from "@/interfaces/profile";
import type { UserInterface } from "@/interfaces/user";
import { UpdatePersonalInfoData } from "@/api/profile";
import { requestHandler } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

const PersonalInfoTab = ({user}:{user:UserInterface}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePersonalInfo>({
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const [loading, setLoading] = useState(false)

  const onSubmit = async(data:UpdatePersonalInfo)=>{
    await requestHandler(
        async()=> await UpdatePersonalInfoData(data),
        setLoading,
        (res)=>{
            toast.success("Personal details updated successfully")
            user.fullName = res.data?.fullName;
            user.email= res.data?.email
        },
        (err)=> toast.error(err || "something went wrong")
    )
  }

  return (
    <TabsContent
      value="personalInfo"
      className="grid md:grid-cols-3 gap-4 py-4"
    >
      <div>
        <h1 className="font-semibold text-lg">Personal Info</h1>
        <p className="text-gray-400 text-[16px]">
          Update your personal details.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 border rounded-lg">
        <div className="p-4">
          <Input
            type="text"
            label="Full Name"
            {...register("fullName", { required: "Full Name is required" })}
            className="rounded-lg"
          />
          {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
          <label htmlFor="email" className="font-semibold">
            Email address
          </label>
          <div className="border rounded-lg mt-1 flex items-center gap-2 px-2 py-1">
            <Mail strokeWidth="1px" size={22} />
            <input
              type="email"
              id="email"
              {...register("email", {required:"Email is required"})}
              className="p-1 w-full outline-none"
            />
          </div>
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <hr className="h-0.5 bg-white" />
        <div className="flex items-center justify-end gap-4 p-4">
          <button type="submit" className="px-4 py-1.5 bg-primary text-black cursor-pointer" disabled={loading}>
            {loading ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </TabsContent>
  );
};

export default PersonalInfoTab;
