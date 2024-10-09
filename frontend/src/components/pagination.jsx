import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

const Paginations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}`).then(
      (response) =>
        response.json().then((data) => {
          setData(data);
          setLoading(false);
        })
    );
  }, [page]);

  const totalPages = 100 / 10

  const handlePageChange = (value, page) => {
    setPage(page);
  };

  // const itemsPerPage = 5;

  // Calculate the number of pages
  // const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page data
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="max-w-2xl">
        <div className="grid grid-cols-2 gap-4 w-[700px] my-4">
          {!loading
            ? data?.map((p, index) => {
                return (
                  <div
                    key={index}
                    className="h-28 bg-gradient-to-r to-blue-500 rounded-sm from-blue-300 flex justify-center items-center"
                  >
                    <h4>{p?.title?.substring(0, 10)}</h4>
                  </div>
                );
              })
            : Array(10)
                .fill(10)
                .map((p, index) => {
                  return (
                    <div
                      key={index}
                      className="h-28 bg-gradient-to-r to-black from-pink-300 animate-pulse rounded-sm flex justify-center items-center"
                    ></div>
                  );
                })}
        </div>
        <div className="w-[700px] flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          color="primary"
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
        </div>
      </div>
    </div>
  );
};

export default Paginations;
