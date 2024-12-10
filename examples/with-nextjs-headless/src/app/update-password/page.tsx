"use client";

import { useForm } from "@refinedev/react-hook-form";
import { useUpdatePassword } from "@refinedev/core";

export default function UpdatePasswordPage() {
  const { mutate: updatePassword } = useUpdatePassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit((data) => updatePassword(data))}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors?.password && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          {errors?.confirmPassword && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
