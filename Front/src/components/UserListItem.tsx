import { User } from "../models/userModel";

interface UserProps {
  user: User;
}

const UserListItem = ({ user }: UserProps) => {
  // Get initials from prenom and nom.
  const initials = `${user.prenom.charAt(0)}${user.prenom.charAt(1)}`.toUpperCase();

  return (
    <li className="flex items-center gap-4 p-4 my-2 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-200/50 transition-shadow" >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold">
        {initials}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{user.prenom} {user.nom}</h3>
        <p className="text-sm text-gray-500">ID: {user.id}</p>
      </div>
    </li>
  );
};

export default UserListItem;
