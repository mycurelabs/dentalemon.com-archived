import { DirectoryHeader } from "@/components/directory/DirectoryHeader"

export default function FindADentistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <DirectoryHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
