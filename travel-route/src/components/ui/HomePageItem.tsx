import { AnimatedSection } from "./AnimatedSection";

interface HomePageItemType {
  src1: string;
  src2: string;
  num: number;
  position?: "left" | "right";
}

export const HomePageItem = ({
  src1,
  src2,
  num,
  position,
}: HomePageItemType) => {
  const description = [
    {
      title: "Discover Amazing Destinations",
      text: "Customize your journey! Easily add cities you’ve visited or planned by selecting locations directly on the map. Explore visually and plan smarter!",
    },
    {
      title: "Quick City & Country Search",
      text: "Find any city or country instantly! Type in the search box, and the map will zoom to your location with an automatic city info form ready to fill out. Planning has never been easier.",
    },
    {
      title: "Country View & Find Your Position",
      text: "The world at your fingertips! View countries separately and find your current location with one click. Make your travel planning more effective than ever.",
    },
    {
      title: "City Tourist Spots & Details Page",
      text: "Dive into the heart of the city! Discover top tourist attractions and detailed descriptions for each city. Get ready for unforgettable experiences.",
    },
    {
      title: "To-Do List for Tourist Spots",
      text: "Plan your adventures and stay organized! Create and edit your to-do lists for each tourist spot anytime. Flexibility in planning at your fingertips",
    },
    {
      title: "Todos & Trip Completion",
      text: "Track your progress! Your to-dos appear as checkboxes on the planning page. Mark completed tasks and when you finish your trip, cities automatically move to your visited list.",
    },
    {
      title: "Favorite Cities & Filtering",
      text: "Keep your favorites close! Add cities to your favorites and filter your visited list to show only your top picks. Your favorite places always within reach.",
    },
  ];

  return (
    <AnimatedSection animation="slide-in-bottom">
      <div
        className={`flex  flex-col items-center gap-6 ${
          position === "left" ? "md:flex-row" : "md:flex-row-reverse"
        } md:items-start md:gap-20 2xl:gap-50`}
      >
        <div className="relative w-full max-w-lg mx-auto mt-5 h-96">
          <img
            src={src1}
            alt={src1.split(".")[0]}
            className="absolute top-0 left-0 z-10  duration-500 rounded-lg shadow-2xl w-80 h-80 sm:w-72 sm:h-72   transition-all   hover:scale-110 hover:z-30 hover:rotate-[10deg] "
          />

          <img
            src={src2}
            alt={src2.split(".")[0]}
            className="absolute z-20 hidden transition-transform duration-300 shadow-2xl rounded-xl sm:block h-80 w-80 sm:w-72 sm:h-72 top-12 left-40 hover:scale-105"
          />
        </div>
        <div className="mb-5 md:mb-0 md:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700 xl:text-3xl">
            {description[num].title}
          </h2>
          <p className="italic leading-relaxed text-gray-600 lg:text-lg ">
            {description[num].text}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};
