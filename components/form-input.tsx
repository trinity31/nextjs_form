interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  icon?: React.ReactNode;
  defaultValue?: string;
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  errors,
  icon,
  defaultValue,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          name={name}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-10"
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
        />
      </div>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}