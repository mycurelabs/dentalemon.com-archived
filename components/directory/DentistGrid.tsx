"use client";

import { Dentist } from "@/types/dentist";
import { DentistCard } from "./DentistCard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DentistGridProps {
  dentists: Dentist[];
  viewMode: "grid" | "list";
  onBookClick?: (dentistId: string) => void;
}

export function DentistGrid({ dentists, viewMode, onBookClick }: DentistGridProps) {
  if (dentists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 text-6xl">🦷</div>
        <h3 className="text-2xl font-semibold mb-2">No dentists found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search criteria or filters to find more dentists in your area.
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid gap-6",
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      )}
    >
      {dentists.map((dentist) => (
        <motion.div key={dentist.id} variants={itemVariants}>
          <DentistCard
            dentist={dentist}
            viewMode={viewMode}
            onBookClick={onBookClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
