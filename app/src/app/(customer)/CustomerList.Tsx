// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import { Box, Button, Card, Flex, Spinner, Text } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { customerApi } from "./api"
import { Customer } from "./model"
import { CustomerCard } from "./CustomerCard"

export const CustomerList = () => {
  // En vrai, avec Next 14 et la nouvelle archi (app directory)
  // il vaut mieux faire un Server Component et await l'appel à l'API
  // dans un composant async
  //
  // Cela fera la requête depuis le serveur, ce sera plus rapide et
  // c'est bénefique pour le SEO (et puis c'est plus simple).
  //
  // Je laisse la version useEffect pour montrer que je comprend :)

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
