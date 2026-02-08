import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sampleDentists } from "@/data/dentists/sample-dentists";
import { DentistProfileClient } from "./DentistProfileClient";
import { generateDentistSchema, generateDentistBreadcrumbSchema } from "@/lib/seo/generateDentistSchema";
import { ScrollProgress } from "@/components/directory/ScrollProgress";

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

      {/* Breadcrumb Navigation — merged below DirectoryHeader */}
      <nav className="sticky top-16 z-40 relative bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800" aria-label="Breadcrumb">
        <ol className="container px-4 md:px-6 flex items-center gap-1.5 text-sm text-muted-foreground py-3">
          <li>
            <Link href="/find-a-dentist" className="hover:text-foreground transition-colors">Find a Dentist</Link>
          </li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="text-foreground font-medium truncate max-w-[200px]">{dentist.name}</li>
        </ol>
        <ScrollProgress />
      </nav>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="container px-4 md:px-6">
          <DentistProfileClient dentist={dentist} />
        </div>
      </section>
    </>
  );
}
