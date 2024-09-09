import { ProjectTypes } from "@definitions/projectTypes";

/**
 * Map `Refine` cli commands to project script
 */
export const projectScripts = {
  [ProjectTypes.REACT_SCRIPT]: {
    getDev: (args: string[]) => ["start", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => require.resolve(".bin/react-scripts"),
  },
  [ProjectTypes.VITE]: {
    getDev: (args: string[]) => ["dev", ...args],
    getStart: (args: string[]) => ["preview", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => require.resolve(".bin/vite"),
  },
  [ProjectTypes.NEXTJS]: {
    getDev: (args: string[]) => ["dev", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => require.resolve(".bin/next"),
  },
  [ProjectTypes.REMIX]: {
    getDev: (args: string[]) => ["dev", ...args],
    getStart: (args: string[]) => {
      // remix-serve accepts a path to the entry file as an argument
      // if we have arguments, we will pass them to remix-serve and do nothing.
      // ex: `refine start ./build/index.js`
      const hasArgs = args?.length;
      if (hasArgs) {
        return args;
      }

      // otherwise print a warning and use `./build/index.js` as default
      console.log();
      console.warn(
        "🚨 Remix requires a path to the entry file. Please provide it as an argument to `refine start` command in package.json scripts",
      );
      console.warn("Refine will use `./build/index.js` as default");
      console.warn("Example: `refine start ./build/index.js`");
      console.log();

      return ["./build/index.js"];
    },
    getBuild: (args: string[]) => ["build", ...args],
    getBin: (type?: "dev" | "start" | "build") => {
      const binName = type === "start" ? "remix-serve" : "remix";
      return require.resolve(`.bin/${binName}`);
    },
  },
  [ProjectTypes.REMIX_VITE]: {
    getDev: (args: string[]) => ["vite:dev", ...args],
    getStart: (args: string[]) => {
      // remix-serve accepts a path to the entry file as an argument
      // if we have arguments, we will pass them to remix-serve and do nothing.
      // ex: `refine start ./build/server/index.js`
      const hasArgs = args?.length;
      if (hasArgs) {
        return args;
      }

      // otherwise print a warning and use `./build/server/index.js` as default
      console.log();
      console.warn(
        "🚨 Remix requires a path to the entry file. Please provide it as an argument to `refine start` command in package.json scripts",
      );
      console.warn("Refine will use `./build/server/index.js` as default");
      console.warn("Example: `refine start ./build/server/index.js`");
      console.log();

      return ["./build/server/index.js"];
    },
    getBuild: (args: string[]) => ["vite:build", ...args],
    getBin: (type?: "dev" | "start" | "build") => {
      const binName = type === "start" ? "remix-serve" : "remix";
      return require.resolve(`.bin/${binName}`);
    },
  },
  [ProjectTypes.REMIX_SPA]: {
    getDev: (args: string[]) => ["vite:dev", ...args],
    getStart: (args: string[]) => ["preview", ...args],
    getBuild: (args: string[]) => ["vite:build", ...args],
    getBin: (type?: "dev" | "start" | "build") => {
      const binName = type === "start" ? "vite" : "remix";
      return require.resolve(`.bin/${binName}`);
    },
  },
  [ProjectTypes.CRACO]: {
    getDev: (args: string[]) => ["start", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => require.resolve(".bin/craco"),
  },
  [ProjectTypes.PARCEL]: {
    getDev: (args: string[]) => ["start", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => require.resolve(".bin/parcel"),
  },
  [ProjectTypes.UNKNOWN]: {
    getDev: (args: string[]) => [...args],
    getStart: (args: string[]) => [...args],
    getBuild: (args: string[]) => [...args],
    getBin: () => {
      return "unknown";
    },
  },
};
