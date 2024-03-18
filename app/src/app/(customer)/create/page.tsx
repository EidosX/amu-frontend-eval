// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import { Box, Button, Card, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCustomerDto, createCustomerDtoSchema } from "../model"
import { customerApi } from "./api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateUserPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCustomerDto>({
    resolver: zodResolver(createCustomerDtoSchema)
  })

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(userDTO: CreateCustomerDto) {
    if (isLoading) return
    try {
      setIsLoading(true)
      const customer = await customerApi.create(userDTO)
      console.log(customer)
      router.push("/")
      toast("Le client a été crée!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card maxW={400} px={4} py={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <Text textTransform='uppercase' fontWeight={800} fontSize={40}>
              Créez un client
            </Text>
            <Stack spacing={3}>
              <Input
                placeholder='Nom complet'
                aria-invalid={errors.fullName ? "true" : "false"}
                {...register("fullName")}
              />
              <Input type='email' placeholder='Adresse mail' {...register("email")} />
            </Stack>
            <Button
              type='submit'
              aria-invalid={errors.email ? "true" : "false"}
              isDisabled={isLoading}
            >
              {!isLoading ? "Créer le client" : <Spinner />}
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}
