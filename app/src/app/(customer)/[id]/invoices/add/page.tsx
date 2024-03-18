// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client"

import {
  Box,
  Button,
  Card,
  Flex,
  Input,
  Select,
  Spinner,
  Stack,
  Switch,
  Text
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateInvoiceDto, createInvoiceDtoSchema } from "../model"
import { register } from "module"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { invoiceApi } from "../api"

export default function AddInvoice({
  params: { id: customerId }
}: {
  params: { id: number }
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<CreateInvoiceDto>({
    resolver: zodResolver(createInvoiceDtoSchema),
    defaultValues: { customerId, status: "SENT" }
  })
  const router = useRouter()
  const status = watch("status")
  console.log(errors)

  const [isLoading, setIsLoading] = useState(false)
  async function onSubmit(invoiceDTO: CreateInvoiceDto) {
    console.log(invoiceDTO)
    if (isLoading) return
    try {
      setIsLoading(true)
      const invoice = await invoiceApi.create(invoiceDTO)
      router.push(`/${invoice.customerId}`)
      router.refresh()
      toast("La facture a été crée!")
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card minW={500} px={12} py={16}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <Text textTransform='uppercase' fontWeight={800} fontSize={40}>
              Nouvelle facture
            </Text>
            <Stack spacing={3} direction='row'>
              <Input
                placeholder='Montant (€)'
                type='number'
                aria-invalid={errors.amount ? "true" : "false"}
                {...register("amount")}
              />
              <Select {...register("status")} defaultValue='SENT'>
                <option value='PAID'>Payée</option>
                <option value='SENT'>Non payée</option>
              </Select>
            </Stack>
            <Button type='submit' isDisabled={isLoading}>
              {!isLoading ? "Enregistrer la facture" : <Spinner />}
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}
