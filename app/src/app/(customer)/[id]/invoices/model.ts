// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { z } from "zod"

export const invoiceSchema = z.object({
  id: z.number().int(),
  customerId: z.number().int(),
  createdAt: z.coerce.date(),
  amount: z.number().int(),
  status: z.enum(["paid", "unpaid"])
})

export type Invoice = z.infer<typeof invoiceSchema>
