import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/logo.png'
export default function Header() {
  return (
    <header className="flex flex-col md:flex-row gap-y-5 md:gap-y-0 w-full items-center justify-center md:justify-between container py-10">
      <Link to="/" className="text-2xl flex items-center gap-3"><div className=""><img className="w-10 aspect-square object-cover" src={Logo} alt="" /></div>Luminate</Link>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className={({isActive}) =>
              isActive ? "border-b-[3px] border-[#4B6587]" : ""
            }
          >
            О нас
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/ideas"}
            className={({isActive}) =>
              isActive ? "border-b-[3px] border-[#4B6587]" : ""
            }
          >
            Идеи
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
