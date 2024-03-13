import ResetPasswordForm from "@/app/components/ResetPasswordForm";
import { verifyJwt } from "@/lib/jwt";

interface Props {
  params: {
    jwt: string;
  };
}

/**
 * Renders the Reset Password page.
 * @param {Props} props - The component props.
 * @param {string} props.params.jwt - The JWT token from the URL parameters.
 * @returns {JSX.Element} - The rendered Reset Password page.
 */
const ResetPasswordPage = ({ params }: Props) => {
  const payload = verifyJwt(params.jwt);
  if (!payload)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        The URL is not valid!
      </div>
    );
  return (
    <div className="flex justify-center">
      <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  );
};

export default ResetPasswordPage;
