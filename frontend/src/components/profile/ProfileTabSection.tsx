import type { UserInterface } from "@/interfaces/user"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import PersonalInfoTab from "./PersonalInfoTab"
import PasswordTab from "./PasswordTab"


const ProfileTabSection = ({user}:{user:UserInterface}) => {
  return (
    <div className="mx-4">
      <Tabs defaultValue="personalInfo">
        <TabsList className="w-full border-b-2 border-gray-400">
          <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
          <TabsTrigger value="changePswd">Change Password</TabsTrigger>
        </TabsList>
        {/* Tab content */}
        <PersonalInfoTab user={user}/>
        <PasswordTab/>
      </Tabs>
    </div>
  )
}

export default ProfileTabSection
