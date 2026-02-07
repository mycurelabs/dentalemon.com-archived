"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileBioProps {
  bio: string;
}

const TRUNCATE_LENGTH = 200;

export function ProfileBio({ bio }: ProfileBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!bio) {
    return null;
  }

  const shouldTruncate = bio.length > TRUNCATE_LENGTH;

  const displayedBio = shouldTruncate && !isExpanded
    ? `${bio.substring(0, TRUNCATE_LENGTH)}...`
    : bio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card rounded-lg border shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold mb-4">About</h2>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground leading-relaxed"
          >
            {displayedBio}
          </motion.p>
        </AnimatePresence>

        {shouldTruncate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300",
              "gap-1 rounded-lg px-3"
            )}
          >
            {isExpanded ? (
              <>
                Read Less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Read More
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
