function InputField(props) {
  const { label, id, extra, type, placeholder, variant, state, disabled, name } =
    props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm ${
          variant === "auth"
            ? "ml-1.5 font-medium text-[#6C4E31]"
            : "ml-3 font-bold text-[#603F26]"
        }`}
      >
        {label}
      </label>
      <input
        name={name}
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border p-3 text-sm outline-none ${
          disabled === true
            ? "bg-[#FFEAC5] text-[#6C4E31] border-[#FFDBB5] placeholder:text-[#6C4E31] opacity-50"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500"
            : "border-[#6C4E31] bg-[#FFDBB5] text-[#603F26] placeholder:text-[#6C4E31] focus:border-[#603F26]"
        }`}
      />
    </div>
  );
}

export default InputField;
