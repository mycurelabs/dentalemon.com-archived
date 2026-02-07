import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sampleDentists } from "@/data/dentists/sample-dentists";
import { DentistProfileClient } from "./DentistProfileClient";
import { ChevronRight } from "lucide-react";
import { generateDentistSchema, generateDentistBreadcrumbSchema } from "@/lib/seo/generateDentistSchema";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dentist = sampleDentists.find((d) => d.slug === slug);

  if (!dentist) {
    return {
      title: "Dentist Not Found | Dentalemon",
      description: "The dentist profile you are looking for could not be found.",
    };
  }

  return {
    title: `${dentist.name} - ${dentist.specialty} | Dentalemon`,
    description: dentist.bio.substring(0, 160),
    openGraph: {
      title: `${dentist.name} - ${dentist.specialty}`,
      description: dentist.bio.substring(0, 160),
      images: [dentist.photo],
    },
  };
}

export default async function DentistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const dentist = sampleDentists.find((d) => d.slug === slug);

  // Return 404 if dentist not found
  if (!dentist) {
    notFound();
  }

  // Generate JSON-LD structured data
  const dentistSchema = generateDentistSchema(dentist);
  const breadcrumbSchema = generateDentistBreadcrumbSchema(dentist);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dentistSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-muted/50 border-b">
        <div className="container px-4 md:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#FFCC5E] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/find-a-dentist" className="hover:text-[#FFCC5E] transition-colors">
              Find a Dentist
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{dentist.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <DentistProfileClient dentist={dentist} />
        </div>
      </section>
    </>
  );
}
