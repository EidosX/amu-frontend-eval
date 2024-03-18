// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import { Card, Flex, Switch, Text } from "@chakra-ui/react"
import { Invoice } from "./model"
import { useOptimistic, useState } from "react"
import { invoiceApi } from "./api"

export const InvoiceItem = ({ invoice }: { invoice: Invoice }) => {
  const [status, setStatus] = useState({ status: invoice.status, loading: false })
  return (
    <Card w='100%' px={6} py={4} display='flex' flexDir='row'>
      <Text fontWeight='bold'>{invoice.amount}€</Text>
      <Flex ml='auto' gap={4}>
        {status.status == "PAID" && <Text color='green'>Payée</Text>}
        {status.status == "SENT" && <Text color='red'>Non payée</Text>}
        <Switch
          isChecked={status.status == "PAID"}
          isDisabled={status.loading}
          onChange={async e => {
            const oldStatus = status.status
            const newStatus = e.target.checked ? "PAID" : "SENT"
            setStatus({ status: newStatus, loading: true })
            try {
              const newInvoice = await invoiceApi.update({
                id: invoice.id,
                status: newStatus
              })
              setStatus(s => ({ status: newStatus, loading: false }))
            } catch {
              setStatus(s => ({ status: oldStatus, loading: false }))
            }
          }}
        />
      </Flex>
    </Card>
  )
}
