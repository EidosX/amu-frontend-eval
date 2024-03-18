// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Card, Text } from "@chakra-ui/react"
import Link from "next/link"
import { Customer } from "./model"

export const CustomerCard = ({ customer }: { customer: Customer }) => {
  return (
    <Card w='18rem' _hover={{ scale: 1.05 }} cursor='pointer' flexGrow={1} px={6} py={4}>
      <Link href={`/${customer.id}`}>
        <Text textTransform='uppercase' fontWeight='bold' fontSize='1.2rem'>
          {customer.fullName}
        </Text>
        <Text>{customer.email}</Text>
      </Link>
    </Card>
  )
}
