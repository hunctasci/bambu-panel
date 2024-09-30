"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
export var columns = [
    {
        accessorKey: "name",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Name
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "surname",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Surname
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "dateOfBirth",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Date of Birth
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            var value = getValue();
            return (<div className="text-left">
          {value instanceof Date
                    ? value.toLocaleDateString()
                    : new Date(value).toLocaleDateString()}
        </div>);
        }
    },
    {
        accessorKey: "competence",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Competence
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            var competences = getValue();
            return <div className="text-left">{competences.join(", ")}</div>;
        }
    },
    {
        accessorKey: "address",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Address
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "telephoneNumber",
        header: function () { return (<div className="whitespace-normal break-words text-left">Telephone</div>); }
    },
    {
        accessorKey: "maritalStatus",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Marital Status
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "hasChildren",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Has Children
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-left">{getValue() ? "Yes" : "No"}</div>);
        }
    },
    {
        accessorKey: "worksWithPets",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Works With Pets
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-left">{getValue() ? "Yes" : "No"}</div>);
        }
    },
    {
        accessorKey: "nationality",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Nationality
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "residencyPermit",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Residency Permit
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-left">{getValue() ? "Yes" : "No"}</div>);
        }
    },
    {
        accessorKey: "travelRestriction",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal break-words">
        Travel Restriction
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-left">{getValue() ? "Yes" : "No"}</div>);
        }
    },
    {
        id: "actions",
        cell: function () {
            return (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Goruntule</DropdownMenuItem>
            <DropdownMenuItem>Duzenle</DropdownMenuItem>
            <DropdownMenuItem>PDF&apos;ini al</DropdownMenuItem>
            <DropdownMenuItem>Sil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>);
        }
    },
];
