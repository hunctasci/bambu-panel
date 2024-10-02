"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addEmployee } from "@/lib/actions";
import { isValid, parse } from "date-fns";

const competencies = [
  { value: "evIsiElemanlari", label: "Ev İşi Elemanları" },
  { value: "hastaBakimi", label: "Hasta Bakımı" },
  { value: "yasliBakimi", label: "Yaşlı Bakımı" },
  { value: "bebekBakimi", label: "Bebek Bakımı" },
  { value: "yatalakBakan", label: "Yatalak Bakan" },
  { value: "alzheimerBakan", label: "Alzheimer Bakan" },
  { value: "dadiYeniDogan", label: "Dadı (Yeni Doğan)" },
  { value: "cocukBakimi", label: "Çocuk Bakımı" },
  { value: "asci", label: "Aşçı" },
  { value: "sofor", label: "Şoför" },
  { value: "oyunAblasi", label: "Oyun Ablası" },
] as const;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const employeeFormSchema = z.object({
  ad: z.string().min(2, { message: "Ad en az 2 karakter olmalı." }),
  soyad: z.string().min(2, { message: "Soyad en az 2 karakter olmalı." }),
  dogumTarihi: z.string().refine(
    (val) => {
      const parsed = parse(val, "dd/MM/yyyy", new Date());
      return isValid(parsed);
    },
    { message: "Geçerli bir tarih giriniz (GG/AA/YYYY)" },
  ),
  yeterlilik: z
    .array(z.enum(competencies.map((c) => c.value)))
    .min(1, { message: "En az bir yeterlilik seçmelisiniz." }),
  adres: z.string().min(5, { message: "Adres en az 5 karakter olmalı." }),
  telefonNumarasi: z
    .string()
    .min(10, { message: "Telefon numarası geçersiz." }),
  medeniDurum: z.enum(["Evli", "Bekar"]),
  cocukSahibi: z.boolean(),
  oncekiIsverenler: z.string().optional(),
  referanslar: z.string().optional(),
  evcilHayvan: z.boolean(),
  uyruk: z.string().min(2, { message: "Uyruk gerekli." }),
  oturumIzni: z.boolean(),
  seyahatKisitlamasi: z.boolean(),
  notlar: z.string().optional(),
  fotograf: z
    .any()
    .refine((files) => files?.length > 0, "Fotoğraf yüklemeniz gerekiyor.")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      `Maksimum dosya boyutu 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Sadece .jpg, .jpeg, .png ve .webp formatları kabul edilir.",
    ),
});

// Infer the schema type
type EmployeeFormData = z.infer<typeof employeeFormSchema>;

export default function EmployeeForm() {
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      ad: "",
      soyad: "",
      dogumTarihi: "",
      yeterlilik: [],
      adres: "",
      telefonNumarasi: "",
      medeniDurum: "Bekar",
      cocukSahibi: false,
      oncekiIsverenler: "",
      referanslar: "",
      evcilHayvan: false,
      uyruk: "",
      oturumIzni: false,
      seyahatKisitlamasi: false,
      notlar: "",
      fotograf: undefined,
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "dogumTarihi") {
          const [day, month, year] = value.split("/");
          formData.append(key, `${year}-${month}-${day}`);
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (key === "fotograf" && value instanceof FileList) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    try {
      await addEmployee(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="ad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad</FormLabel>
                <FormControl>
                  <Input placeholder="Adınızı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soyad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soyad</FormLabel>
                <FormControl>
                  <Input placeholder="Soyadınızı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dogumTarihi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doğum Tarihi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="GG/AA/YYYY"
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 2 && value.length <= 4) {
                        value = `${value.slice(0, 2)}/${value.slice(2)}`;
                      } else if (value.length > 4) {
                        value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
                      }
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefonNumarasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="Telefon numaranızı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medeniDurum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medeni Durum</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Medeni Durum Seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Evli">Evli</SelectItem>
                    <SelectItem value="Bekar">Bekar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cocukSahibi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Çocuk Sahibi mi?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="yeterlilik"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Yeterlilik</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {competencies.map((item) => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name="yeterlilik"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.value,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Adresinizi girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oncekiIsverenler"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Önceki İşverenler</FormLabel>
              <FormControl>
                <Input placeholder="Önceki işverenlerinizi girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referanslar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referanslar</FormLabel>
              <FormControl>
                <Input placeholder="Referanslarınızı girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uyruk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uyruk</FormLabel>
              <FormControl>
                <Input placeholder="Uyruk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oturumIzni"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Oturum İzni Var mı?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seyahatKisitlamasi"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Seyahat Kısıtlaması Var mı?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notlar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notlar</FormLabel>
              <FormControl>
                <Input placeholder="Ek notlar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fotograf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fotoğraf</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(e.target.files);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Gönder
        </Button>
      </form>
    </Form>
  );
}
