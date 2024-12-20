"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { handleLogin } from "@/app/actions";
import Image from "next/image";
import { EnvelopeIcon, UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LogIn() {
  const [state, action] = useActionState(handleLogin, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={150}
          height={50}
          priority
        />
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email}
          icon={<EnvelopeIcon className="w-5 h-5 text-gray-500" />}
          defaultValue={state?.formData?.email as string}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors?.username}
          icon={<UserIcon className="w-5 h-5 text-gray-500" />}
          defaultValue={state?.formData?.username as string}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password}
          icon={<LockClosedIcon className="w-5 h-5 text-gray-500" />}
        />
        <FormButton text="Log in" />
        {state?.success && (
          <div role="alert" className="alert alert-success flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{state.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}