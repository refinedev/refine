import { GetServerSideProps } from "next";
import React from "react";

export default function Home() {
  return <div>Redirecting...</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/categories/1",
    },
    props: {},
  };
};
