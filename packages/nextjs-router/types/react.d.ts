declare module "react" {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}

declare global {
  namespace React {
    interface ReactNode {
      bigint?: never;
    }
  }
}
