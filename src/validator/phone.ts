import { z } from "zod";

export const phoneSchema = z
  .string()
  .length(11, "شماره تلفن باید 11 رقم باشد")
  .regex(/^09/, "شماره تلفن باید با 09 شروع شود");
