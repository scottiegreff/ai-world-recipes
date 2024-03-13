"use client";
import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

/**
 * Defines the form schema for the forgot password page.
 */
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

/**
 * Renders a form for the forgot password page.
 *  * Allows users to submit a request to reset their password by providing their email.
 * @returns JSX.Element
 */

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  /**
   * Handles the submission of the forgot password form.
   *
   * @param data - The form data containing the email.
   */
  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email);
      if (result) toast.success("Reset password link was sent to your email.");
      reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <form
        className="flex flex-col gap-2 p-5 border m-2 rounded-md shadow w-[70vw] md:w-[30vw]"
        onSubmit={handleSubmit(submitRequest)}
      >
        <div className="text-center p-2">Enter Your Email</div>
        <Input
          label="Email"
          {...register("email")}
          startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
        />
        <Button
          isLoading={isSubmitting}
          type="submit"
          disabled={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Please Wait..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
