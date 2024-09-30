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
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Name
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "surname",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Surname
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "dateOfBirth",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
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
        accessorKey: "address",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Address
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "telephoneNumber",
        header: function () { return <div className="whitespace-normal text-left">Telephone</div>; }
    },
    {
        accessorKey: "placeType",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Place Type
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        }
    },
    {
        accessorKey: "hasPets",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Has Pets
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-left">{getValue() ? "Yes" : "No"}</div>);
        }
    },
    {
        accessorKey: "healthCondition.condition",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Health Condition
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            var condition = getValue();
            return (<div className="text-left">
          {condition ? condition : "No health condition"}
        </div>);
        }
    },
    {
        accessorKey: "children",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Children
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            var children = getValue();
            return (<div className="text-left">
          {Array.isArray(children) && children.length
                    ? children
                        .map(function (child, index) {
                        return "Child ".concat(index + 1, ": Age ").concat(child.age, ", Count ").concat(child.count);
                    })
                        .join(", ")
                    : "No children"}
        </div>);
        }
    },
    {
        accessorKey: "weight",
        header: function (_a) {
            var column = _a.column;
            return (<Button variant="ghost" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }} className="whitespace-normal">
        Weight (kg)
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>);
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-center">{getValue()}</div>);
        }
    },
    {
        accessorKey: "notes",
        header: function () { return <div className="whitespace-normal text-left">Notes</div>; },
        cell: function (_a) {
            var getValue = _a.getValue;
            return (<div className="text-left">{getValue()}</div>);
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
