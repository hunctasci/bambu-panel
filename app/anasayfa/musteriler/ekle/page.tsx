"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { addEmployer } from "@/lib/actions";
import { z } from "zod";
import { parse, isValid } from "date-fns";

const formSchema = z.object({
  ad: z.string().min(2, { message: "Ad en az 2 karakter olmalı." }),
  soyad: z.string().min(2, { message: "Soyad en az 2 karakter olmalı." }),
  dogumTarihi: z.string().refine(
    (val) => {
      const parsed = parse(val, "dd/MM/yyyy", new Date());
      return isValid(parsed);
    },
    { message: "Geçerli bir tarih giriniz (GG/AA/YYYY)" },
  ),
  adres: z.string().min(5, { message: "Adres en az 5 karakter olmalı." }),
  telefonNumarasi: z
    .string()
    .min(10, { message: "Telefon numarası geçersiz." }),
  yerTipi: z.enum(["Müstakil", "Dublex", "Normal Daire"], {
    required_error: "Yer tipi seçiniz.",
  }),
  evcilHayvan: z.boolean().default(false),
  saglikDurumu: z.string().optional(),
  cocuklar: z.string().optional(),
  kilo: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : parseFloat(val))),
  notlar: z.string().optional(),
});

type EmployerFormData = z.infer<typeof formSchema>;

export default function EmployerForm() {
  const form = useForm<EmployerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ad: "",
      soyad: "",
      dogumTarihi: "",
      adres: "",
      telefonNumarasi: "",
      yerTipi: undefined,
      evcilHayvan: false,
      saglikDurumu: "",
      cocuklar: "",
      kilo: "",
      notlar: "",
    },
  });

  const onSubmit = async (data: EmployerFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "dogumTarihi") {
          const [day, month, year] = value.split("/");
          formData.append(key, `${year}-${month}-${day}`);
        } else if (key === "kilo" && typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    try {
      await addEmployer(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error (e.g., show error message to user)
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
            name="yerTipi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yer Tipi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Yer Tipi Seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Müstakil">Müstakil</SelectItem>
                    <SelectItem value="Dublex">Dublex</SelectItem>
                    <SelectItem value="Normal Daire">Normal Daire</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evcilHayvan"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Evcil Hayvan Var mı?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="saglikDurumu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sağlık Durumu</FormLabel>
              <FormControl>
                <Input placeholder="Sağlık durumunu girin" {...field} />
              </FormControl>
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
          name="cocuklar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Çocuklar</FormLabel>
              <FormControl>
                <Input placeholder="Çocuklar hakkında bilgi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kilo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Kilonuzu girin"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
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

        <Button type="submit" className="w-full md:w-auto">
          Gönder
        </Button>
      </form>
    </Form>
  );
}
