import type { UserInterface } from "@/interfaces/user";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Input from "../Input";
import {useForm} from "react-hook-form"
import { CloudUpload } from "lucide-react";
import { useEffect, useState } from "react";
import type { UpdateAvatarImage } from "@/interfaces/form";
import { requestHandler } from "@/utils";
import { updateAvatar } from "@/api/profile";
import { toast } from "sonner";

const Avatar = ({user}:{user:UserInterface}) => {

  const {register, handleSubmit, formState:{errors}, watch} = useForm<UpdateAvatarImage>();
  const [profileImgPreview, setProfileImgPreview] = useState(user?.avatar)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const subscribe = watch((value, {name})=>{
      if(name==="avatar"){
        const file = value.avatar?.[0]
        if(file){
          const previewURL = URL.createObjectURL(file)
          setProfileImgPreview(previewURL)

          //cleanup previous URL
          return ()=> URL.revokeObjectURL(previewURL)
        }
      }
    })

    //cleanup
    return ()=> subscribe.unsubscribe();
  }, [watch])
  

  const onSubmit = async(data:UpdateAvatarImage)=>{
    const formData = new FormData();
    formData.append("avatar", data.avatar[0])

    await requestHandler(
      async()=> await updateAvatar(formData),
      setLoading,
      (res)=>{
        toast.success("Avatar updated successfully")
        user.avatar = res.data.avatar
      },
      (err)=> toast.error(err || "something went wrong.")
    )
  }

  return (
    <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.fullName}
              className="h-28 min-w-28 -translate-y-7 rounded-full object-cover border-2"
            />
            <Dialog>
              <DialogTrigger>                
                <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary/70 hover:bg-white/50 p-2 rounded-full cursor-pointer">
                  <CloudUpload />
                </div>
              </DialogTrigger>
               <DialogContent className="md:w-2xl w-[80vw] z-50 fixed top-[50%] left-[50%] md:left-[60%] -translate-x-1/2 -translate-y-1/2 bg-neutral-900 p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle className="font-semibold text-primary text-xl">
              Update Profile Image
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Upload you new Profile Image.
            </DialogDescription>
          </DialogHeader>
          <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-white">
              <Input
                type="file"
                label="Profile Img*"
                accept="image/*"
                {...register("avatar", {
                  required: "Background Image is required.",
                  validate: (files) =>
                    (files && files.length === 1) || "Please upload 1 image.",
                })}
              />
              <img
                src={profileImgPreview}
                alt="background-img"
                className="mx-auto h-52 w-52 text-center object-cover rounded-full border border-dashed p-1 mt-2"
              />
              {errors.avatar && (
                <p className="text-red-600">{errors.avatar.message}</p>
              )}
            </div>
            <DialogFooter>
              <button
                className="min-w-full bg-primary text-black py-2 my-3 font-semibold hover:bg-primary/70 cursor-pointer"
                type="submit"
              >
                {loading ? "Uploading.." : "Upload"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
            </Dialog>
          </div>
  )
}

export default Avatar
