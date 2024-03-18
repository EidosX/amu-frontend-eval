// Copyright (c) 2024 Diego Imbert
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Header } from "@/app/main-page/Header"
import { CustomerListSection } from "@/app/(customer)/CustomerList"

export default function Home() {
  return (
    <main>
      <Header />
      <CustomerListSection />
    </main>
  )
}
