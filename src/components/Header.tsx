import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.png'
export default function Header() {
  return (
    <header className="flex justify-between container py-10">
      <div className="text-2xl flex items-center gap-3"><div className=""><img className="w-10 aspect-square object-cover" src={Logo} alt="" /></div>Luminate</div>
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
