import type { ButtonInterface } from "../interfaces/form.ts";

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type="button",
  ...props
}: ButtonInterface) => {
  return (
    <div className="relative">
      <button
        className={`relative font-semibold bg-primary text-black hover:bg-accent hover:text-black  md:text-lg py-1 px-3 cursor-pointer z-30 ${className} text-shadow-lg`}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
