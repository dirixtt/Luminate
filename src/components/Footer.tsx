import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" text-black/80 py-10 border-t-[3px]">
      <h3 className="text-center ">Социальные сети</h3>
      <ul className="flex mt-3 items-center justify-center gap-10">
        <li>
          <Link className="flex items-center gap-3" to="">
            <BsInstagram /> @Luminate
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-3" to="">
            <BsTwitterX /> @Luminate
          </Link>
        </li>
        <li >
          <Link className="flex items-center gap-3" to="">
            <FaFacebook /> /Luminate
          </Link>
        </li>
      </ul>
      <p className="text-[#8e8e8e] w-[50%] text-center font-[300] m-auto my-5 text-sm">
        Подписывайтесь на наши социальные сети, чтобы быть в курсе всех
        последних новостей, обновлений и конкурсов!
      </p>
    </footer>
  );
}
