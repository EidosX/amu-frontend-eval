// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { z } from "zod"

export const customerSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  fullName: z.string().min(3),
  email: z.string().email()
})

export type Customer = z.infer<typeof customerSchema>

export const createCustomerDtoSchema = customerSchema.omit({ createdAt: true, id: true })
export type CreateCustomerDto = z.infer<typeof createCustomerDtoSchema>
