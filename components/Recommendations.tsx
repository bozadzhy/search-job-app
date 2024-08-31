"use client";
import React, { useEffect, useState } from "react";
import { FormData } from "./Auth";
import useSWR from "swr";
import { fetcher } from "@/api/api";
import { TJobs, TJob } from "./Search";
import JobCard from "./JobCard";
import Search from "./Search";

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
  const handleLikeClick = (id: string) => {
    const findJob = jobs?.data.find((job) => job.job_id === id);

    if (!findJob) {
      console.error("Job not found");
      return;
    }
    const likedJobsStr = localStorage.getItem("liked-jobs");
    let likedArr: TJob[] = likedJobsStr ? JSON.parse(likedJobsStr) : [];
    const findJobInLikedArr = likedArr.find((job: TJob) => job.job_id === id);

    if (!findJobInLikedArr) {
      likedArr.push(findJob);
    } else {
      likedArr = likedArr.filter((job: TJob) => job.job_id !== id);
    }
    localStorage.setItem("liked-jobs", JSON.stringify(likedArr));
  };
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
                  handleLikeClick={handleLikeClick}
                />
              ))
            : null}
        </div>
      )}
    </>
  );
};

export default Recommendations;
