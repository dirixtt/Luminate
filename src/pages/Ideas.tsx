import { useQuery } from "react-query";
import { Idea } from "../Types/Types";
import dataService from "../services/data.service";
import { Empty, Steps, Tag, message } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { MutatingDots } from "react-loader-spinner";
import { BsArrowDown, BsArrowRight, BsArrowUp } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Filter {
  category: string | null;
  language: string | null;
  device: string | null;
}

export default function Ideas() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>(null);
  const [more, setMore] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter>({
    category: null,
    language: null,
    device: null,
  });

  const { isLoading, error, data } = useQuery<Idea[], Error>({
    queryKey: ["Data"],
    queryFn: async () => {
      try {
        const response = await dataService.getData();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });

  const handleFilterChange = (key: keyof Filter, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredData = data?.filter((idea: Idea) => {
    const { category, language, device } = filters;
    return (
      (!category || idea.category.includes(category)) &&
      (!language || idea.languages.includes(language)) &&
      (!device || idea.device.includes(device)) &&
      (!search ||
        idea.title.toLowerCase().includes(search.toLowerCase()) ||
        idea.content.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const uniqueLanguages = ["JavaScript", "Python", "Swift", "HTML/CSS"];
  const uniqueCategories = [
    "Фитнес",
    "Здоровье",
    "Питание",
    "Организация",
    "Семья",
    "Ментальное благополучие",
    "Личное развитие",
    "Финансы",
    "Музыка",
    "Эмоции",
    "Кулинария",
    "Образование",
    "Технологии",
    "Мотивация",
    "Книги",
    "Рекомендации",
    "Путешествия",
    "Социальные сети",
    "Локальные сообщества",
    "Искусство",
    "Культура",
  ];

  const uniqueDevices = ["мобильное", "веб"];

  const handleSearch = () => {
    if (search) {
      setSearch(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#000"
          secondaryColor="#000"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    message.error("Error: " + error.message);
    return <>Error occurred. Please try again later.</>;
  }

  return (
    <div className="container">
      <h2 className="m-auto text-center">
        "Идеи для Кодера: Инновации Каждый День"
      </h2>
      <div className="m-auto flex flex-col md:flex-row items-center justify-center gap-5 my-10 ">
        <div className="flex w-full md:w-fit h-12">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search || ""}
            className="px-2 w-4/5 bg-transparent outline-none border-black border-2 h-full"
            type="text"
          />
          <button
            onClick={handleSearch}
            className="px-5 bg-[#000] text-[#F0E5CF] h-full border-black border-2"
          >
            {search ? <MdClose /> : <FiSearch />}
          </button>
        </div>
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="bg-[#C8C6C6] w-full md:w-fit px-2 h-12 flex items-center border-[#C8C6C6] border-2"
        >
          Фильтр <IoIosArrowDown />
        </button>
      </div>

      <div
        className={`flex flex-col gap-y-5 ${
          openFilter
            ? "max-h-[200px] md:max-h-[100px] duration-300"
            : "max-h-0 overflow-hidden duration-300"
        }`}
      >
        <h3>Фильтр</h3>
        <div className="gap-10 md:h-12 w-full flex flex-col md:flex-row items-center justify-between">
          <select
            className="px-2 w-full md:w-1/3 bg-transparent outline-none border-black border-2 h-full"
            defaultValue=""
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">Все Категории</option>
            {uniqueCategories.map((category: string) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            defaultValue=""
            className="px-2 w-full md:w-1/3 bg-transparent outline-none border-black border-2 h-full"
            onChange={(e) => handleFilterChange("language", e.target.value)}
          >
            <option value="">Все Языки</option>
            {uniqueLanguages.map((language: string) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
          <select
            className="px-2 w-full md:w-1/3 bg-transparent outline-none border-black border-2 h-full"
            defaultValue=""
            onChange={(e) => handleFilterChange("device", e.target.value)}
          >
            <option value="">Все Устройства</option>
            {uniqueDevices.map((device: string) => (
              <option value={device} key={device}>
                {device}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="py-5">
        {filteredData && filteredData.length > 0 ? (
          <div>
            {filteredData
              .slice(0, more ? filteredData.length : 5)
              .map((idea: Idea, index) => (
                <div
                  key={idea._id || index}
                  onClick={() =>
                    setOpenId(openId === idea._id ? null : idea._id)
                  }
                  className={`my-10 p-5 cursor-pointer hover:bg-black/5 duration-300 md:w-[60%] m-auto text-center ${openId == idea._id ? "bg-black/5 rounded" : "bg-transparent"}`}
                >
                  <h3>{idea.title}</h3>
                  <p className="text-gray-500 font-[300] text-sm my-1">
                    {idea.content}
                  </p>
                  <span className="text-gray-500 font-[300] text-sm">
                    Создано: {idea.date}
                  </span>

                  <div
                    className={
                      openId === idea._id
                        ? " duration-300 max-h-[5050px]"
                        : "max-h-0 overflow-hidden duration-300"
                    }
                  >
                    <div className="my-1">
                      {idea.device.map((c: string, idx: number) => (
                        <Tag color="green" key={idx}>
                          {c}
                        </Tag>
                      ))}
                    </div>
                    <div className="my-1">
                      {idea.languages.map((c: string, idx: number) => (
                        <Tag color="blue" key={idx}>
                          {c}
                        </Tag>
                      ))}
                    </div>
                    <div className="my-3">
                      <Steps
                        direction="vertical"
                        items={idea.steps.map((s, idx) => ({
                          title: s,
                          key: idx,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            {filteredData.length > 5 && (
              <div className="w-full flex inset-0 pb-5">
                <button
                  onClick={() => setMore(!more)}
                  className="bg-[#000] text-[#F0E5CF] px-4 py-2 rounded-[2px] m-auto hover:bg-gray-900 transition-colors duration-300"
                >
                  {more ? (
                    <span className=" flex items-center gap-4 ">
                      Меньше <BsArrowUp />
                    </span>
                  ) : (
                    <span className=" flex items-center gap-4 ">
                      {" "}
                      Больше <BsArrowDown />{" "}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Empty />
        )}
      </div>
      <div className="md:w-[80%] py-10 flex flex-col inset-0 m-auto text-center">
        <p>
        Хотите разнообразить свой творческий процесс или пока не нашли подходящую идею? Нажмите на ссылку ниже, чтобы получить случайную идею проекта и открыть для себя новые возможности творчества!
        </p>
        <Link to="/random" className="pt-10 flex items-center gap-4 px-4 py-2 rounded-[2px] m-auto text-[#4B6587] transition-colors duration-300">
          Получить случайную идею проекта <BsArrowRight/>
        </Link>
      </div>
    </div>
  );
}
