import { Search } from "lucide-react";
import React from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function Searchbar() {
  const navigate = useNavigate();
  // Read the query off the URL loosely so the input reflects the active
  // search regardless of which route the navbar is rendered on.
  const { query } = useSearch({ strict: false }) as { query?: string };
  const [search, setSearch] = React.useState(query ?? "");

  React.useEffect(() => {
    // Don't navigate until the typed value actually diverges from the URL,
    // otherwise a fresh mount on another route would bounce the user home.
    if (search === (query ?? "")) return;
    const timer = setTimeout(() => {
      navigate({
        to: "/",
        search: search ? { query: search } : {},
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, query, navigate]);

  return (
    <InputGroup className="hidden md:flex lg:max-w-lg">
      <InputGroupInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
