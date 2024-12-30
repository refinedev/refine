import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "src/components/button";
import { LogoIcon } from "src/components/icons/logo";
import { Input } from "src/components/input";
import { FeatureSlide, FeatureSlideMobile } from "src/components/feature-slide";
import type { MeUpdateVariables } from "src/interfaces/api";
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
    url: "https://github.com/refinedev/refine/blob/main/LICENSE",
  },
];

const OnboardingForm = () => {
  const [loading, setLoading] = React.useState(false);
  const { handleSubmit, control, setValue, setError, formState } =
    useForm<MeUpdateVariables>({
      defaultValues: {
        name: "",
        jobTitle: "",
        company: "",
      },
    });

  const navigate = useNavigate();

  const fetchMe = React.useCallback(async () => {
    setLoading(true);
    try {
      const me = await getMe();
      if (me && typeof me.name === "string") {
        setValue("name", me.name);
        setValue("jobTitle", me?.jobTitle || "");
        setValue("company", me?.company || "");
        return;
      }
    } catch (error: any) {
      setError("root", {
        message: error?.message || genericError,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (values: MeUpdateVariables) => {
    try {
      setLoading(true);
      const me = await updateMe(values);
      if (!me) {
        setError("root", {
          message: genericError,
        });
      }

      return navigate("/overview");
    } catch (error: any) {
      setError("root", {
        message: error?.message || genericError,
      });
      setLoading(false);
    }
    setLoading(false);
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
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
          <Controller<MeUpdateVariables>
            key={name}
            name={name}
            control={control}
            rules={{ required: required && "This field is required" }}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  disabled={field.disabled || loading}
                  loading={loading}
                  key={name}
                  label={label}
                  required={required}
                  placeholder={placeholder}
                  className="re-w-full"
                  error={formState.errors[name]?.message}
                />
              );
            }}
          />
        ))}
        <div
          className={clsx(
            "re-relative",
            "re-w-full",
            "re-flex",
            "re-items-center",
            "re-justify-end",
          )}
        >
          <div
            className={clsx(
              "re-absolute",
              "re-w-56",
              "re-left-0 -re-top-4 re-bottom-1",
            )}
          >
            {formState.errors.root && (
              <span className="re-text-alt-red re-text-xs">
                {formState.errors.root.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={loading} loading={loading}>
            Continue
          </Button>
        </div>
      </form>
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

const genericError =
  "An error occurred. If it continues, please open a GitHub issue or contact us on Discord.";
