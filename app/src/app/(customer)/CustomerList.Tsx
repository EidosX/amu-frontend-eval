// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Box, Card, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"

export const CustomerListSection = () => {
  return (
    <Flex px={28} py={12} gap={6}>
      <Flex flexDir='column'>
        <Text fontWeight={700} fontSize={42} pb={4}>
          Nos Utilisateurs
        </Text>
        <Text>
          Chez Invox, nous sommes doté d'une grande génerosité: nous mettons à disposition
          les données de tous nos utilisateurs publiquement, 100% gratuitement. Le partage
          est une valeur tellement importante pour nous que nous avons décidé d'afficher
          tous nos utilisateurs directement sur la page d'accueil.
        </Text>
      </Flex>
      <SmilingGuyCard />
    </Flex>
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
