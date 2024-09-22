"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useState } from "react";

const EmployeeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  dateOfBirth: z.date({
    message: "A date of birth is required.",
  }),
  competence: z.enum(["Bebek Bakicisi", "Temizlik Elemani", "Yasli Bakici"]),
  address: z.string().min(1, { message: "Address is required" }),
  telephoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }), // Modify regex as needed
});

export default function EmployeeEditForm({ employee }) {
  const [date, setDate] = useState();
  const { name, surname, dateOfBirth, competence, address, telephoneNumber } =
    employee;

  const form = useForm({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: name || "",
      surname: surname || "",
      dateOfBirth: dateOfBirth || "",
      competence: competence || "",
      address: address || "",
      telephoneNumber: telephoneNumber || "",
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h3 className="mb-4 text-2xl">Edit Employee</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Surname
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={surname}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="DateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: tr })
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={date}
                      onSelect={setDate}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Competence"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Competence
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={competence}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={address}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Telephone Number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Telephone Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={telephoneNumber}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
