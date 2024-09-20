import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { LayoutDashboard, Users, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Command>
      <CommandList className="pt-3">
        <CommandGroup>
          <CommandItem>
            <LayoutDashboard className="mr-2 h-7 w-7" />
            <Link href="/">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Users className="mr-2 h-7 w-7" />
            <Link href="/employees">Employees</Link>
          </CommandItem>
          <CommandItem>
            <BriefcaseBusiness className="mr-2 h-7 w-7" />
            <Link href="/employers">Employers</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
