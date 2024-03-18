// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import { Box, Button, Card, Flex, Spinner, Text } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { customerApi } from "./create/api"
import { Customer } from "./model"

export const CustomerList = () => {
  const [customerList, setCustomerList] = useState<Customer[] | null>(null)
  useEffect(() => {
    customerApi.list().then(setCustomerList)
  }, [])
  if (customerList === null)
    return (
      <Box w='100%' h='8rem' display='flex' alignItems='center' justifyContent='center'>
        <Spinner />
      </Box>
    )

  return (
    <Flex flexDir='row' flexWrap='wrap' gap={6}>
      {customerList.map(customer => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </Flex>
  )
}

const CustomerCard = ({ customer }: { customer: Customer }) => {
  return (
    <Card w='18rem' _hover={{ scale: 1.05 }} cursor='pointer' flexGrow={1} px={6} py={4}>
      <Link href={`/${customer.id}`}>
        <Text textTransform='uppercase' fontWeight='bold'>
          {customer.fullName}
        </Text>
        <Text>{customer.email}</Text>
      </Link>
    </Card>
  )
}

export const CustomerListSection = () => {
  return (
    <Box px={28} py={12}>
      <Flex gap={6} pb={12}>
        <Flex flexDir='column'>
          <Flex flexDir='row' alignItems='center'>
            <Text fontWeight={700} fontSize={42} pb={4} mr='auto'>
              Nos Clients
            </Text>
            <Link href='/create'>
              <Button mb={4}>Créer un client</Button>
            </Link>
          </Flex>
          <Text>
            Chez Invox, nous sommes doté d'une grande génerosité: nous mettons à
            disposition les données de tous nos utilisateurs publiquement, 100%
            gratuitement. Le partage est une valeur tellement importante pour nous que
            nous avons décidé d'afficher tous nos utilisateurs directement sur la page
            d'accueil.
          </Text>
        </Flex>
        <SmilingGuyCard />
      </Flex>
      <CustomerList />
    </Box>
  )
}

const SmilingGuyCard = () => (
  <Card>
    <Flex dir='column' h='100%' alignItems='center'>
      <Text mx={4} w={340} color='grey'>
        Lui, on sait pas qui c'est. En tout cas, on a pris toutes ses données, et il est
        content.
      </Text>
      <Box pos='relative' w={900} h={260}>
        <Image
          src='/smiling-guy.jpeg'
          alt='a smiling man'
          fill
          style={{ objectFit: "cover", flexShrink: 0 }}
        />
      </Box>
    </Flex>
  </Card>
)
