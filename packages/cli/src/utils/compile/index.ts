import Handlebars from "handlebars";
import {
  readFileSync,
  readdirSync,
  createFileSync,
  writeFileSync,
  unlinkSync,
} from "fs-extra";

export const compile = (filePath: string, params: any): string => {
  const content = readFileSync(filePath);

  Handlebars.registerHelper("ifIn", (elem, list, options) => {
    if (elem.includes(list)) {
      return options.fn(Handlebars);
    }
    return options.inverse(Handlebars);
  });

  Handlebars.registerHelper("formatInferencerComponent", (string) => {
    if (!string) {
      return;
    }

    switch (string) {
      case "chakra-ui":
        return "ChakraUI";

      default:
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  });

  Handlebars.registerHelper("capitalize", (string) => {
    if (!string) {
      return;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  });

  const template = Handlebars.compile(content.toString());
  return template(params);
};

export const compileDir = (dirPath: string, params: any) => {
  const files = readdirSync(dirPath);

  files.forEach((file: string) => {
    const templateFilePath = `${dirPath}/${file}`;
    // create file
    const compiledFilePath = `${dirPath}/${file.replace(".hbs", "")}`;
    createFileSync(compiledFilePath);

    // write compiled file
    writeFileSync(compiledFilePath, compile(templateFilePath, params));

    // delete template file (*.hbs)
    unlinkSync(templateFilePath);
  });
};
