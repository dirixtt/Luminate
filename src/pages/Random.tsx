import { MutatingDots } from "react-loader-spinner";
import dataService from "../services/data.service";
import { useQuery } from "react-query";
import { Steps, Tag, message } from "antd";
import { useState } from "react";
import { Idea } from "../Types/Types";
import { IoReload } from "react-icons/io5";

export default function Random() {
  const { isLoading, error, data } = useQuery<any, Error>({
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

  const [randomIdea, setRandomIdea] = useState<Idea | null>(null);

  const getRandomIdea = () => {
    // if (data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomIdea(data[randomIndex]);
    // }
    console.log(randomIdea);
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
      <h2>
        Вдохновение на каждой странице: Провозглашаем случайные идеи проектов!
      </h2>
      <p className="py-4">
        Добро пожаловать на страницу случайных идей проектов Luminate! Здесь вы
        можете обнаружить новые идеи, которые могут вдохновить вас на следующий
        проект. Независимо от того, являетесь ли вы начинающим программистом,
        опытным разработчиком или просто ищете новые вызовы, наша коллекция
        случайных идей может стать источником вашего следующего творческого
        вдохновения.
      </p>
      <p className="py-4">
        Просто нажмите кнопку{" "}
        <span className="border-b-[3px] border-[#4B6587]">
          {" "}
          "Показать случайную идею"
        </span>
        , чтобы получить новое предложение проекта. Каждая идея - это уникальная
        возможность создать что-то новое, интересное и значимое. Позвольте себе
        окунуться в мир творчества и программирования!
      </p>
      <p className="py-4">
        Приготовьтесь к приключению и начинайте исследовать наши случайные идеи
        прямо сейчас!
      </p>
      <div className="flex inset-0">
        <button
          onClick={getRandomIdea}
          className="bg-[#000] text-sm md:text-xl  flex items-center gap-4 my-10 m-auto text-[#F0E5CF] px-4 py-2 rounded-[2px] hover:bg-gray-900 transition-colors duration-300"
        >
          Показать случайную идею {randomIdea && <IoReload/>}
        </button>
      </div>
      {randomIdea && (
        <div className="py-4">
          <div
            className={`my-10 p-5 cursor-pointe duration-300 md:w-[60%] m-auto text-center`}
          >
            <h3>{randomIdea.title}</h3>
            <p className="text-gray-500 font-[300] text-sm my-1">
              {randomIdea.content}
            </p>
            <span className="text-gray-500 font-[300] text-sm">
              Создано: {randomIdea.date}
            </span>

            <div>
              <div className="my-1">
                {randomIdea.device.map((c: string, idx: number) => (
                  <Tag color="green" key={idx}>
                    {c}
                  </Tag>
                ))}
              </div>
              <div className="my-1">
                {randomIdea.languages.map((c: string, idx: number) => (
                  <Tag color="blue" key={idx}>
                    {c}
                  </Tag>
                ))}
              </div>
              <div className="my-3">
                <Steps
                  direction="vertical"
                  items={randomIdea.steps.map((s, idx) => ({
                    title: s,
                    key: idx,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
