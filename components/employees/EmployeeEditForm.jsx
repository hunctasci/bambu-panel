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

const EmployeeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format for dateOfBirth",
  }),
  competence: z.enum(["Bebek Bakicisi", "Temizlik Elemani", "Yasli Bakici"]),
  address: z.string().min(1, { message: "Address is required" }),
  telephoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }), // Modify regex as needed
});

export default function EmployeeEditForm({ employee }) {
  return <div></div>;
}
