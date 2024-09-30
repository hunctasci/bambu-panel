"use client";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
// DropdownMenuLabel,
// DropdownMenuSeparator,
DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MdAssignmentInd, MdDashboard, MdDehaze, MdHomeWork, MdLogout, } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
export default function Navbar() {
    var pathname = usePathname();
    return (<div className="flex w-full items-center justify-between rounded-xl border p-3">
      <div className="flex items-center justify-center md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdDehaze size={25}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5 flex flex-col justify-between">
            <DropdownMenuItem>
              <Link href="/anasayfa" className="flex w-full items-center justify-center gap-2 rounded-l border px-10 py-5">
                <MdDashboard size={25}/>
                <span>Ana Sayfa</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/anasayfa/personeller" className="flex w-full items-center justify-center gap-2 rounded-l border px-10 py-5">
                <MdAssignmentInd size={25}/>
                Personeller
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/anasayfa/musteriler" className="flex w-full items-center justify-center gap-2 rounded-l border px-10 py-5">
                <MdHomeWork size={25}/>
                Musteriler
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="destructive" className="w-full gap-2 px-10">
                <MdLogout size={25}/>
                Cikis Yap
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="font-bold capitalize">{pathname.split("/").pop()}</div>
      <div className="flex gap-3">
        <Input placeholder="Arama"/>
        <ModeToggle />
      </div>
    </div>);
}
