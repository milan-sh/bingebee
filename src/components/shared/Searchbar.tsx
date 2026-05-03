import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function Searchbar() {
  return (
    <InputGroup className="hidden md:flex lg:max-w-lg ">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
    </InputGroup>
  )
}
