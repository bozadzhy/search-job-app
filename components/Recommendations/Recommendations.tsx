"use client";
import React, { useEffect, useState } from "react";
import { FormData } from "../Auth/Auth";
import useSWR from "swr";
import { fetcher } from "@/api/api";
import { TJobs, TJob } from "../Search/Search";
import JobCard from "../JobCard/JobCard";
import Search from "../Search/Search";

const Recommendations: React.FC = () => {
  const [query, setQuery] = useState<FormData>({
    name: "",
    jobTitle: "",
    aboutMe: "",
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const info = JSON.parse(userInfo);
      setQuery(info.jobTitle);
    }
  }, [query]);

  const { data: jobs, isLoading } = useSWR<TJobs>(
    query
      ? [`https://jsearch.p.rapidapi.com/search?query=${query}`, "GET"]
      : null,
    fetcher as any
  );

  if (isLoading)
    return <h3 className="text-center text-gray-600">Loading...</h3>;
  return (
    <>
      {query.jobTitle === "" ? (
        <div className="flex flex-col justify-center">
          <h3 className="text-center text-gray-600">
            Create Profile to get the recommendation
          </h3>
          <Search />
        </div>
      ) : (
        <div className="flex flex-col">
          <h3 className="text-gray-600 text-center mt-4">
            Recommendation for you:
          </h3>
          {jobs
            ? jobs?.data &&
              jobs.data.map((job) => (
                <JobCard
                  key={job.job_id}
                  job={job}
                />
              ))
            : null}
        </div>
      )}
    </>
  );
};

export default Recommendations;
