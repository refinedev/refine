import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/button";
import { LogoIcon } from "src/components/icons/logo";
import { Input } from "src/components/input";
import { FeatureSlide, FeatureSlideMobile } from "src/components/feature-slide";
import { MeUpdateVariables } from "src/interfaces/api";
import { getMe, updateMe } from "src/utils/me";

export const Onboarding = () => {
  return (
    <div
      className={clsx(
        "re-min-h-screen re-w-full",
        "re-grid re-grid-cols-1 large:re-grid-cols-2 re-gap-4",
        "re-p-4",
      )}
    >
      <div
        className={clsx(
          "re-flex",
          "re-justify-center",
          "re-items-center",
          "re-rounded-lg",
          "re-bg-gray-800",
          "re-hidden large:re-flex",
        )}
      >
        <FeatureSlide className={clsx("re-w-full", "re-max-w-3xl")} />
      </div>
      <div
        className={clsx(
          "re-flex",
          "re-flex-col",
          "re-items-center",
          "re-justify-center",
        )}
      >
        <OnboardingForm />
        <FeatureSlideMobile
          className={clsx("re-flex large:re-hidden", "re-mt-12")}
        />
      </div>
    </div>
  );
};

const inputs = [
  {
    name: "name",
    label: "Your name",
    required: true,
    placeholder: "Enter your name",
  },
  {
    name: "jobTitle",
    label: "Job title",
    required: true,
    placeholder: "Please enter your job title",
  },
  {
    name: "company",
    label: "Company name",
    required: true,
    placeholder: "Enter your company name",
  },
] as const;

const links = [
  {
    name: "Privacy Policy",
    url: "https://refine.dev/privacy-policy/",
  },
  {
    name: "Terms and conditions",
    url: "https://github.com/refinedev/refine/blob/master/LICENSE",
  },
];

const OnboardingForm = () => {
  const [values, setValues] = React.useState<MeUpdateVariables>({
    name: "",
    jobTitle: "",
    company: "",
  });

  const navigate = useNavigate();

  const fetchMe = React.useCallback(() => {
    return getMe().then((me) => {
      if (me && typeof me.name === "string") {
        setValues((p) => ({
          ...p,
          name: me.name as string,
        }));
      }
    });
  }, []);

  React.useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <div
      className={clsx(
        "re-max-w-[336px]",
        "re-w-full",
        "re-flex",
        "re-flex-col",
        "re-gap-16",
        "re-justify-center",
        "re-items-center",
      )}
    >
      <LogoIcon height={60} width={252} />
      <div
        className={clsx(
          "re-flex",
          "re-flex-col",
          "re-items-center",
          "re-justify-center",
          "re-gap-6",
          "re-w-full",
        )}
      >
        {inputs.map(({ name, label, required, placeholder }) => (
          <Input
            key={name}
            label={label}
            required={required}
            placeholder={placeholder}
            value={values[name]}
            onChange={(value) =>
              setValues((prev) => ({
                ...prev,
                [name]: value,
              }))
            }
            className="re-w-full"
          />
        ))}
        <div
          className={clsx(
            "re-w-full",
            "re-flex",
            "re-items-center",
            "re-justify-end",
          )}
        >
          <Button
            onClick={() => {
              updateMe(values).then(() => {
                navigate("/overview");
              });
            }}
          >
            Continue
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          "re-flex",
          "re-items-center",
          "re-justify-between",
          "re-w-full",
        )}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx("re-text-gray-500", "re-underline", "re-text-xs")}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};
