// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Box, Button, Card, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { CustomerList } from "./CustomerList"

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
            Chez Invox, nous sommes doté d&apos;une grande génerosité: nous mettons à
            disposition les données de tous nos utilisateurs publiquement, 100%
            gratuitement. Le partage est une valeur tellement importante pour nous que
            nous avons décidé d&apos;afficher tous nos utilisateurs directement sur la
            page d&apos;accueil.
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
        Lui, on sait pas qui c&apos;est. En tout cas, on a pris toutes ses données, et il
        est content.
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
