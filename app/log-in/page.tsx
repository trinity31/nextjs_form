"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { handleLogin } from "@/app/actions";
import { logIn } from "./actions";
import { EnvelopeIcon, UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-9xl">🥕</span>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password}
        />
        <FormButton text="Log in" />
      </form>
    </div>
  );
}