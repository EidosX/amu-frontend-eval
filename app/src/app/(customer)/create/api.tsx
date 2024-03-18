// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CreateCustomerDto, Customer, customerSchema } from "../model"
import { API_KEY, API_URL } from "@/../../cypress/utils"

export const customerApi = {
  async create(dto: CreateCustomerDto): Promise<Customer> {
    return await fetch(`${API_URL}/customer`, {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Prefer: "return=representation"
      }
    })
      .then(response => response.json())
      .then(items => customerSchema.parse(items[0]))
  },
  async list(): Promise<Customer> {
    return fetch(`${API_URL}?order=created_at`, {
      headers: { apiKey: API_KEY }
    })
      .then(response => response.json())
      .then(customerSchema.parse)
  }
}
