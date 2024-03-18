// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import { Box, Button, Card, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCustomerDto, createCustomerDtoSchema } from "../model"
import { customerApi } from "../api"
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
      router.refresh()
      toast("Le client a été crée!")
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card w={500} px={12} py={16}>
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
              <Input
                type='email'
                placeholder='Adresse mail'
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
            </Stack>
            <Button type='submit' isDisabled={isLoading}>
              {!isLoading ? "Enregistrer" : <Spinner />}
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}
