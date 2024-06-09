import { z } from "zod";

export const createBannerSchema = (allowedHeight: number) => z.object({
  size: z.number().max(5000000, "حجم تصویر باید کمتر از 5 مگابایت باشد"),
  type: z
    .string()
    .refine((type) => ["image/jpeg", "image/png"].includes(type), {
      message: "فقط تصاویر JPEG و PNG مجاز هستند",
    }),
  height: z.number().refine((height) => height === allowedHeight, {
    message: `ارتفاع تصویر باید مساوی ${allowedHeight} پیکسل باشد`,
  }),
});
