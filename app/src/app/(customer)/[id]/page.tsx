// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Box, Button, Card, Flex, Stack, Text } from "@chakra-ui/react"
import { customerApi } from "../api"
import { invoiceApi } from "./invoices/api"
import { InvoiceItem } from "./invoices/InvoiceItem"
import Link from "next/link"

export default async function CustomerDetails({
  params: { id }
}: {
  params: { id: number }
}) {
  const customer = await customerApi.get(id)
  const invoiceList = await invoiceApi.list({ customer })

  return (
    <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card minW={500} px={12} py={16}>
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
          </Link>
        </Flex>
        <Stack gap={3} mt={4}>
          {invoiceList.map(invoice => (
            <InvoiceItem key={invoice.id} invoice={invoice} />
          ))}
        </Stack>
      </Card>
    </Box>
  )
}
