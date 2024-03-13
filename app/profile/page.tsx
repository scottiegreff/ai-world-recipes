import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";

/**
  * Component for the profile page.
 * @returns {JSX.Element} The ProfilePage component.
 */
const ProfilePage = async () => {
  const session = await getServerSession(options);
  const user = session?.user;
  //   if (!session || !session.user) redirect("/auth/signin");
  return (
    <div className="flex flex-col m-5 md:m-10 gap-y-4">
      {/* if there is no user.image than show react icon <IoPersonCircleSharp />  */}
      {user?.image ? (
        <Image
          height={50}
          width={50}
          src={user.image}
          alt={user?.firstName ?? ""}
          className="rounded-full"
        />
      ) : (
        <IoPersonCircleSharp className="text-9xl" />
      )}
      <p>First Name: </p> <p className="col-span-3 ms-3">{user?.firstName}</p>
      <p>Last Name: </p> <p className="col-span-3 ms-3">{user?.lastName}</p>
      <p>Phone:</p> <p className="col-span-3 ms-3">{user?.phone}</p>
      <p>Email:</p> <p className="col-span-3 ms-3">{user?.email}</p>
    </div>
  );
};

export default ProfilePage;
