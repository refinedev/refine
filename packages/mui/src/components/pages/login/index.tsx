import * as React from "react";
import { type LoginPageProps, useActiveAuthProvider } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {
  type BaseRecord,
  type HttpError,
  useLogin,
  useTranslate,
} from "@refinedev/core";

type ILoginForm = {
  username: string;
  password: string;
  remember?: boolean;
};

/**
 * @deprecated LoginPage is deprecated. Use AuthPage instead. @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page} for more details.
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/components/refine-config/#loginpage} for more details.
 */
export const LoginPage: React.FC<LoginPageProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, ILoginForm>();

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<ILoginForm>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const translate = useTranslate();

  return (
    <>
      <Box
        component="div"
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)",
          backgroundSize: "cover",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
                alt="Refine Logo"
                style={{ maxWidth: 200 }}
              />
            </div>
            <Box mt={4}>
              <Card>
                <CardContent sx={{ paddingX: "32px" }}>
                  <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    sx={{
                      fontWeight: "700",
                      margin: "12px 0",
                    }}
                  >
                    {translate("pages.login.title", "Sign in your account")}
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                      login(data);
                    })}
                    gap="16px"
                  >
                    <TextField
                      {...register("username", {
                        required: true,
                      })}
                      id="username"
                      margin="normal"
                      size="small"
                      fullWidth
                      label={translate("pages.login.username", "Username")}
                      name="username"
                      autoComplete="username"
                      autoFocus
                    />
                    <TextField
                      {...register("password", {
                        required: true,
                      })}
                      id="password"
                      size="small"
                      margin="normal"
                      fullWidth
                      name="password"
                      label={translate("pages.login.password", "Password")}
                      helperText={errors?.password?.message}
                      type="password"
                      placeholder="●●●●●●●●"
                      autoComplete="current-password"
                    />
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          span: {
                            fontSize: "12px",
                            color: "text.secondary",
                          },
                        }}
                        color="secondary"
                        control={
                          <Checkbox
                            size="small"
                            id="remember"
                            {...register("remember")}
                          />
                        }
                        label={translate("pages.login.remember", "Remember me")}
                      />
                      <Link
                        href="#"
                        sx={{
                          fontSize: "12px",
                          textDecoration: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          {translate(
                            "pages.login.forgotPassword",
                            "Forgot password?",
                          )}
                        </Typography>
                      </Link>
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        my: "8px",
                        color: "white",
                      }}
                      disabled={isLoading}
                    >
                      {translate("pages.login.signin", "Sign in")}
                    </Button>
                    <Box style={{ marginTop: 8 }}>
                      <Typography variant="subtitle2">
                        {translate(
                          "pages.login.noAccount",
                          "Don’t have an account?",
                        )}{" "}
                        <Link
                          underline="none"
                          href="#"
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {translate("pages.login.signup", "Sign up")}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
