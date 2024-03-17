import { useQuery } from "react-query";
import { Idea } from "../Types/Types";
import dataService from "../services/data.service";
import { Empty, Steps, Tag, message } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { MutatingDots } from "react-loader-spinner";

interface Filter {
  category: string | null;
  language: string | null;
  device: string | null;
}

export default function Ideas() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter>({
    category: "",
    language: "",
    device: "",
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
      (!device || idea.device.includes(device))
    );
  });

  const filteredSearchData = filteredData?.filter((idea: Idea) => {
    if (!search) return true; // If no search term, include all ideas
    return (
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  const Languages: string[] = ["JavaScript", "Python", "Swift", "HTML/CSS"];
  const Categories: string[] = [
    "Фитнес",
    "Здоровье",
    "Питание",
    "Организация",
    "Семья",
    "Ментальное благополучие",
    "Личное развитие",
    "Финансы",
    "Погода",
    "Новости",
    "Информация",
    "Производительность",
    "Мотивация",
  ];
  const Devices: string[] = ["мобильное", "веб", "десктоп"];

  const handleSearch = () => {
    if (search) {
      setSearch(null);
    }
  };
  if (isLoading) {
    return <div className="w-full py-10 flex items-center justify-center"><MutatingDots
    visible={true}
    height="100"
    width="100"
    color="#000"
    secondaryColor="#000"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>;
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
        <div className="flex h-12">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search || ""}
            className="px-2 bg-transparent outline-none border-black border-2 h-full"
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
            {Categories.map((l: string) => (
              <option value={l} key={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            defaultValue=""
            className="px-2 w-full md:w-1/3 bg-transparent outline-none border-black border-2 h-full"
            onChange={(e) => handleFilterChange("language", e.target.value)}
          >
            <option value="">Все Языки</option>
            {Languages.map((l: string) => (
              <option value={l} key={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            className="px-2 w-full md:w-1/3 bg-transparent outline-none border-black border-2 h-full"
            defaultValue=""
            onChange={(e) => handleFilterChange("device", e.target.value)}
          >
            <option value="">Все Устроиства</option>
            {Devices.map((l: string) => (
              <option value={l} key={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="py-5">
        {filteredSearchData && filteredSearchData?.length > 0 ? (
          filteredSearchData?.map((idea: Idea, index) => (
            <div
              key={idea._id || index}
              onClick={() => setOpenId(openId === idea._id ? null : idea._id)}
              className={`my-10 p-5 cursor-pointer hover:bg-black/5 duration-300 md:w-[60%] m-auto text-center`}
            >
              <h3>{idea.title}</h3>
              <p className="text-gray-500 line-clamp-2 font-[300] text-sm my-1">
                {idea.content}
              </p>
              <span className="text-gray-500 font-[300] text-sm">
                Создано: {idea.date}
              </span>

              <div
                className={
                  openId === idea?._id
                    ? " duration-300 max-h-[550px]"
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
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
