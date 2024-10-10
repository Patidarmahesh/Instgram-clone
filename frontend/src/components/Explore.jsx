import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const [explore, setExplore] = React.useState([]);
  const [page, setTPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const clientId = `&client_id=gyn8b7Q_48siDEOdwC-qrYb5Nk1-RoqFvHW9Ow_nsfs`;
  const apiRoot = "https://api.unsplash.com/photos/random";

  const fetchExploreResult = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=gyn8b7Q_48siDEOdwC-qrYb5Nk1-RoqFvHW9Ow_nsfs&page=${page}&per_page=10`
      );
      if (response?.status === 200) {
        setExplore((prev) => [...prev, ...response?.data]);
        setTPage((prev) => prev + 1);
        setLoading(false);
        if (response?.data.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchExploreResult();
    return () => {
      setTPage(1);
    };
  }, []);
  return (
    <div className={`ml-[15%] w-[85%] bg-black px-12 pt-12 ${!explore.length>0&&"h-screen flex justify-center items-center"}`}>
      {explore.length>0 ? (
        <InfiniteScroll
          dataLength={explore?.length}
          next={fetchExploreResult}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more images to display</p>}
        >
          <div className="w-full h-full grid grid-cols-3 row-auto gap-2">
            {explore &&
              explore?.map((image, index) => {
                return (
                  <>
                    {loading ? (
                      <div role="status" class="animate-pulse h-[250px]">
                        <div class="flex items-center justify-center w-full h-full bg-gray-300 rounded dark:bg-gray-700">
                          <svg
                            class="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[350px] overflow-hidden">
                        <img
                          src={image.urls.small}
                          alt={image.alt_description}
                          className="w-full h-full object-cover rounded-sm cursor-pointer hover:scale-150 duration-700 transition-all"
                        />
                      </div>
                    )}
                  </>
                );
              })}
          </div>
        </InfiniteScroll>
      ) : (
        <h1 className="text-2xl font-bold text-white">Please check youre internet</h1>
      )}
    </div>
  );
};

export default Explore;
