import { Metadata } from "next";
import { sampleDentists } from "@/data/dentists/sample-dentists";
import { DirectoryContent } from "./DirectoryContent";

export const metadata: Metadata = {
  title: "Find a Dentist | Dentalemon",
  description: "Find and book appointments with qualified dentists in Metro Manila. Search by specialty, location, and services. Browse verified dental professionals specializing in general dentistry, orthodontics, cosmetic dentistry, and more.",
  openGraph: {
    title: "Find a Dentist | Dentalemon",
    description: "Find and book appointments with qualified dentists in Metro Manila. Search by specialty, location, and services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find a Dentist | Dentalemon",
    description: "Find and book appointments with qualified dentists in Metro Manila.",
  },
};

export default function FindADentistPage() {
  return <DirectoryContent initialDentists={sampleDentists} />;
}
