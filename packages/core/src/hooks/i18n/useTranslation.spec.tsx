import * as React from "react";
import { render, TestWrapper } from "@test";
import { useTranslation } from "@hooks";

const TestComponent: React.FC = () => {
  const { translate, changeLocale, getLocale } = useTranslation();

  React.useEffect(() => {
    changeLocale("en");
  }, [changeLocale]);

  return (
    <div>
      <span>{translate("key")}</span>
      <span>{getLocale()}</span>
    </div>
  );
};

describe("useTranslation", () => {
  it("should return translate, setLocale and getLocale", () => {
    const translateMock = jest.fn();
    const changeLocale = jest.fn();
    const getLocaleMock = jest.fn();

    render(<TestComponent />, {
      wrapper: TestWrapper({
        resources: [{ name: "tests" }],
        i18nProvider: {
          translate: translateMock,
          changeLocale: changeLocale,
          getLocale: getLocaleMock,
        },
      }),
    });

    expect(translateMock).toBeCalledTimes(1);
    expect(translateMock).toBeCalledWith("key", undefined, undefined);
    expect(getLocaleMock).toBeCalledTimes(1);
    expect(changeLocale).toBeCalledTimes(1);
    expect(changeLocale).toBeCalledWith("en");
  });
});
