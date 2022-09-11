import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
