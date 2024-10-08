import { isValidNationalCode, required } from "@/lib/utils/validation.utils";
import { z } from "zod";

export const firsNameSchema = required({ name: "نام" }).max(50, { message: "حداکثر کاراکتر مجاز ۵۰ کاراکتر می‌باشد" });
export const lastNameSchema = required({ name: "نام‌خانوادگی" }).max(50, {
  message: "حداکثر کاراکتر مجاز ۵۰ کاراکتر می‌باشد",
});

export const phoneSchema = z
  .string()
  .length(11, { message: "تعداد ارقام شماره موبایل باید ۱۱ عدد باشد" })
  .regex(new RegExp(/((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g), { message: "شماره موبایل وارد شده نامعتبر است" });

export const identificationSchema = required({ name: "کد معرف " }).length(6, {
  message: "کد معرف باید ۶ کاراکتر باشد",
});

export const nationalCodeSchema = required({ name: "کد کلی" })
  .length(10, { message: "کدملی باید ۱۰ کاراکتر باشد" })
  .refine((code) => isValidNationalCode(code), { message: "کد ملی نامعتبر است" });

