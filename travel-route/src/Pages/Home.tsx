import { HomePageItem } from "../components/ui/HomePageItem";
import { Button } from "../components/ui/Button";
import { ScrollToTop } from "../components/ui/ScrollToTop";

const Home = () => {
  return (
    <section className="max-w-4xl px-4 py-8 2xl:max-w-7xl ">
      <h1 className="mb-10 text-2xl sm:text-3xl font-extrabold tracking-widest text-center text-transparent md:text-4xl bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-green-500">
        Welcome to Travel Route
      </h1>

      <div className="flex flex-col items-center justify-center gap-6 divide-y divide-amber-400">
        <HomePageItem
          src1="visited.png"
          src2="planned.png"
          num={0}
          position="left"
        />
        <HomePageItem
          src1="search.png"
          src2="map.png"
          num={1}
          position="right"
        />
        <HomePageItem
          src1="position.png"
          src2="country.png"
          num={2}
          position="left"
        />
        <HomePageItem
          src1="tour2.png"
          src2="tour1.png"
          num={3}
          position="right"
        />
        <HomePageItem
          src1="todoUpdate.png"
          src2="todo.png"
          num={4}
          position="left"
        />
        <HomePageItem
          src1="todoVisit.png"
          src2="todoPlan.png"
          num={5}
          position="right"
        />
        <HomePageItem
          src1="fav.png"
          src2="favList.png"
          num={6}
          position="left"
        />
        <div className="flex justify-center mt-12">
          <Button type="primary" to="/app">
            Get Started
          </Button>
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
};
export default Home;
