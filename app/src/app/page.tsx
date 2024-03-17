import { Header } from "@/app/main-page/Header"
import Image from "next/image"
import { UserListSection } from "@/app/user/UserList"

export default function Home() {
  return (
    <main>
      <Header />
      <UserListSection />
    </main>
  )
}
