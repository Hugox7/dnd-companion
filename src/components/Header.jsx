"use client"

import { useAuth } from "@/hooks/useAuth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import CreateCharacterDialog from "./CreateCharacterDialog";


export default function Header() {
  const { handleLogout, isPending } = useAuth();

  const { name } = useCurrentUser();

  return (
    <div className="navbar bg-base-200 px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Mes infos</a></li>
            <li>
              <a>Options</a>
              <ul className="p-2">
                <li><a onClick={handleLogout}>Déconnexion</a></li>
              </ul>
            </li>
            <li><a>Les règles</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">DnD Companion</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Mes infos</a></li>
          <li>
            <details>
              <summary>Options</summary>
              <ul className="p-2">
                <li><a onClick={handleLogout}>Déconnexion</a></li>
              </ul>
            </details>
          </li>
          <li><a>Les règles</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <button className="btn btn-primary" onClick={onOpen}>
          Créer
        </button> */}
      </div>
    </div>
  );
}