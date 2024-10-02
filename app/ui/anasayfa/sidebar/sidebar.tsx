import {
  Command,
  // CommandDialog,
  // CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  MdDashboard,
  MdAssignmentInd,
  MdHomeWork,
  MdLogout,
} from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-between rounded-xl border p-7">
      <div className="space-y-5">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg capitalize">Bambu Danismanlik</span>
            <span className="text-xs font-bold">Yonetim Paneli</span>
          </div>
        </div>
        <Command>
          <CommandList>
            <CommandGroup>
              <Link href="/anasayfa">
                <CommandItem className="cursor-pointer gap-5 text-lg">
                  <MdDashboard size={25} />
                  Ana Sayfa
                </CommandItem>
              </Link>
              <Link href="/anasayfa/personeller">
                <CommandItem className="cursor-pointer gap-5 text-lg">
                  <MdAssignmentInd size={25} />
                  Personeller
                </CommandItem>
              </Link>
              <Link href="/anasayfa/musteriler">
                <CommandItem className="cursor-pointer gap-5 text-lg">
                  <MdHomeWork size={25} />
                  Musteriler
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div>
        <Button variant="destructive" className="gap-3 px-10">
          <MdLogout size={25} />
          Cikis Yap
        </Button>
      </div>
    </div>
  );
}
