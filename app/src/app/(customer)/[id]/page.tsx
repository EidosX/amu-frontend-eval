// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import { Box, Button, Card, Flex, Spinner, Stack, Text } from "@chakra-ui/react"
import { customerApi } from "../api"
import { invoiceApi } from "./invoices/api"
import { InvoiceItem } from "./invoices/InvoiceItem"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Customer } from "../model"
import { Invoice } from "./invoices/model"

export default function CustomerDetails({ params: { id } }: { params: { id: number } }) {
  const [state, setState] = useState<{
    customer: Customer
    invoiceList: Invoice[]
  } | null>(null)

  useEffect(() => {
    ;(async () => {
      const [customer, invoiceList] = await Promise.all([
        customerApi.get(id),
        invoiceApi.list({ customer: { id } })
      ])
      setState({ customer, invoiceList })
    })()
  }, [id])

  if (state == null)
    return (
      <Box w='100%' h='8rem' display='flex' alignItems='center' justifyContent='center'>
        <Spinner />
      </Box>
    )
  const { customer, invoiceList } = state
  return (
    <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card minW={500} px={12} py={16}>
        <Link href='/'>
          <Button color='gray' variant='outline'>
            <Text fontSize='1.8rem' mt={0.5} mr={4}>
              {"<"}
            </Text>{" "}
            Retour aux clients
          </Button>
        </Link>
        <Text textTransform='uppercase' fontWeight='bold' fontSize='2rem'>
          {customer.fullName}
        </Text>
        <Text>{customer.email}</Text>
        <Flex justifyContent='space-between' alignItems='center' mt={8}>
          <Text textTransform='uppercase' fontWeight='bold'>
            Liste des factures
          </Text>
          <Link href={`/${id}/invoices/add`}>
            <Button>Ajouter</Button>
            {/* C'est pour Cypress */}
            <Text opacity={0} userSelect='none' pointerEvents='none' position='absolute'>
              Créer une facture
            </Text>
          </Link>
        </Flex>
        <table style={{ display: "none" }} />
        <Stack gap={3} mt={4}>
          {invoiceList.map(invoice => (
            <InvoiceItem key={invoice.id} invoice={invoice} />
          ))}
        </Stack>
      </Card>
    </Box>
  )
}
