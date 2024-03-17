// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { z } from "zod"

export const userSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(3),
  email: z.string().email()
})

export type User = z.infer<typeof userSchema>
