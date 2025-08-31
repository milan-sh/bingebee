import { CloudUpload } from "lucide-react";
import { requestHandler } from "@/utils";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { useForm } from "react-hook-form";
import Input from "../Input";
import type { UpdateCoverImage } from "@/interfaces/form";
import { updateCoverImage } from "@/api/profile";
import { toast } from "sonner";
import type { UserInterface } from "@/interfaces/user";

const BackgroungImg = ({user}:{user:UserInterface}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateCoverImage>();
  const [bgImgPreview, setBgImgPreview] = useState(user?.coverImage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "coverImage") {
        const file = value.coverImage?.[0];
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setBgImgPreview(previewUrl);

          //cleanup previous preview URL
          return () => URL.revokeObjectURL(previewUrl);
        }
      }
    });

    //cleanup
    return()=> subscribe.unsubscribe();
  }, [watch]);

  const onSubmit = async(data:UpdateCoverImage) => {
    const formData = new FormData();
    formData.append("coverImage", data.coverImage[0])

    await requestHandler(
        async()=> updateCoverImage(formData),
        setLoading,
        (res)=>{
            toast.success("Background Image updated successfully`")
            user.avatar = res.data.coverImage 

        },
        (err)=> toast.error(err || "something went wrong.")
    )
  };

  return (
    <div className="relative min-h-52 w-full" style={!user?.coverImage ? { border: "1px solid white" } : {}}>
      {user?.coverImage && (
        <img src={user.coverImage} className="w-full h-52 object-cover" />
      )}
      <Dialog>
        <DialogTrigger>
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary/70 hover:bg-white/50 p-2 rounded-full cursor-pointer">
            <CloudUpload />
          </div>
        </DialogTrigger>
        <DialogContent className="md:w-2xl w-[80vw] z-50 fixed top-[50%] left-[50%] md:left-[60%] -translate-x-1/2 -translate-y-1/2 bg-neutral-900 p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle className="font-semibold text-primary text-xl">
              Update Background Image
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Upload you new Background Image.
            </DialogDescription>
          </DialogHeader>
          <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="file"
                label="Background Img*"
                accept="image/*"
                {...register("coverImage", {
                  required: "Background Image is required.",
                  validate: (files) =>
                    (files && files.length === 1) || "Please upload 1 image.",
                })}
              />
              <img
                src={bgImgPreview}
                alt="background-img"
                className="md:h-52 h-32 w-full object-cover rounded-sm border border-dashed p-1 mt-2"
              />
              {errors.coverImage && (
                <p className="text-red-600">{errors.coverImage.message}</p>
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
  );
};

export default BackgroungImg;
