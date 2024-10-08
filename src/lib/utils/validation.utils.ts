import { z } from "zod";

export const required = ({ name, message = "نمی‌تواند خالی باشد" }: { name: string; message?: string }) =>
  z
    .string({
      required_error: `${name} ${message}`,
    })
    .min(1, { message: `${name} ${message}` });

export function isValidNationalCode(code: string) {
  if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

  let sum = 0,
    chars = code.split(""),
    lastDigit,
    remainder;

  for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

  remainder = sum % 11;
  lastDigit = remainder < 2 ? remainder : 11 - remainder;

  return +chars[9] === lastDigit;
}
