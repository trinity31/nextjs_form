"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
  className?: string;
}

export default function FormButton({ text, className = "" }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`bg-neutral-200 rounded-full h-10 hover:bg-neutral-400 transition-colors disabled:text-neutral-300 text-gray-950 ${className}`}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}