import { cn } from "clsx-tailwind-merge";

interface Props {
  passStrength: number;
}

/**
 * Renders a password strength indicator component.
 *
 * @param {number} passStrength - The strength of the password (0-3).
 * @returns {JSX.Element} - The rendered password strength component.
 */

const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div
      className={cn(" col-span-2 flex gap-2", {
        "justify-around": passStrength === 3,
        "justify-start": passStrength < 3,
      })}
    >
      {Array.from({ length: passStrength + 1 }).map((i, index) => (
        <div
          key={index}
          className={cn("h-2 w-[5vw] rounded-md", {
            "bg-red-500": passStrength === 0,
            "bg-orange-500": passStrength === 1,
            "bg-yellow-500": passStrength === 2,
            "bg-green-500": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
