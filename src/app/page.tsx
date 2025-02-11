'use client'
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  const { user } = useUser();
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-2 xl:gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Get your project summary in seconds{"."}
        </div>
        <div className="font-extralight text-center text-base md:text-4xl dark:text-neutral-200 py-0 xl:py-4">
          we provide a summary of your project using AI{"/"}LLM{"'s."}
        </div>
        <Link href="/dashboard" className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get started
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}

