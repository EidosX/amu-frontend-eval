// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Box, Flex, Text } from "@chakra-ui/react"
import { Logo } from "./Logo"
import Image from "next/image"

export const Header = () => {
  return (
    <Flex gap={16} px={24} py={16} alignItems='center'>
      <Image
        src='/landing-bg.jpg'
        alt='a person making computations'
        layout='fill'
        objectFit='cover'
        style={{ position: "absolute", zIndex: -1, opacity: 0.4 }}
      ></Image>
      <Logo svgProps={{ style: { flexShrink: 0 } }} size={240} />
      <Flex direction='column' gap={2}>
        <Title />
        <Description />
      </Flex>
    </Flex>
  )
}

const Title = () => (
  <Text fontWeight={900} fontSize={120} lineHeight={1}>
    INVOX
  </Text>
)

const Description = () => (
  <Text>
    Nous gérons vos clients et vos factures automatiquement. Il s&apos;agit simplement
    d&apos;une application React, mais personne ne veut financer notre projet, donc nous
    dirons qu&apos;il s&apos;agit d&apos;une solution intelligente utilisant l&apos;IA et
    la Blockchain.
  </Text>
)
