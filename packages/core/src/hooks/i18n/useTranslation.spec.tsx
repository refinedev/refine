import * as React from "react";
import { vi } from "vitest";
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
    const translateMock = vi.fn();
    const changeLocale = vi.fn();
    const getLocaleMock = vi.fn();

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

    expect(translateMock).toHaveBeenCalledTimes(1);
    expect(translateMock).toHaveBeenCalledWith("key", undefined, undefined);
    expect(getLocaleMock).toHaveBeenCalledTimes(1);
    expect(changeLocale).toHaveBeenCalledTimes(1);
    expect(changeLocale).toHaveBeenCalledWith("en");
  });

  it("should pass ns option to translate", () => {
    const translateMock = vi.fn();

    const TestComponentWithNs: React.FC = () => {
      const { translate } = useTranslation({ ns: "common" });

      return (
        <div>
          {translate("title-key", { opiton1: "option1" }, "fallback-title")}
        </div>
      );
    };

    render(<TestComponentWithNs />, {
      wrapper: TestWrapper({
        resources: [{ name: "product" }],
        i18nProvider: {
          translate: translateMock,
          changeLocale: vi.fn(),
          getLocale: vi.fn(),
        },
      }),
    });

    expect(translateMock).toHaveBeenCalledTimes(1);
    expect(translateMock).toHaveBeenCalledWith(
      "title-key",
      { ns: "common", opiton1: "option1" },
      "fallback-title",
    );
  });
});
