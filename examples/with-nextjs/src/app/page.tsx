"use client";

import { Suspense } from "react";
import { NavigateToResource } from "@refinedev/nextjs-router";
import { Authenticated } from "@refinedev/core";
import { Box, Text, Heading } from "@chakra-ui/react";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <Box p={8}>
          <Heading mb={2}>Welcome to the Refine + Next.js Example! </Heading>
          <Text mb={6}>You’ll be redirected to the default resource shortly.</Text>
        </Box>
        <NavigateToResource />
      </Authenticated>
    </Suspense>
  );
}
