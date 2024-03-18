// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { API_KEY, API_URL } from "@/../../cypress/utils"
import { CreateInvoiceDto, Invoice, invoiceSchema } from "./model"

export const invoiceApi = {
  async list({ customer }: { customer: { id: number } }): Promise<Invoice[]> {
    return fetch(`${API_URL}/invoice?order=createdAt&customerId=eq.${customer.id}`, {
      headers: { apiKey: API_KEY }
    })
      .then(response => response.json())
      .then(invoiceSchema.array().parse)
  },
  async update({ id, ...dto }: { id: number } & Partial<Invoice>): Promise<Invoice> {
    return await fetch(`${API_URL}/invoice?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Prefer: "return=representation"
      }
    })
      .then(response => response.json())
      .then(v => invoiceSchema.parse(v[0]))
  },
  async create(dto: CreateInvoiceDto): Promise<Invoice> {
    return await fetch(`${API_URL}/invoice`, {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Prefer: "return=representation"
      }
    })
      .then(response => response.json())
      .then(v => invoiceSchema.parse(v[0]))
  }
}
