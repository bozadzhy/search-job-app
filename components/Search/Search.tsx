"use client";
import { useState } from "react";
import JobCard from "../JobCard/JobCard";
import { fetcher } from "@/api/api";
import useSWR from "swr";

export interface TJobs {
  data: TJob[];
  parameters: { query: string };
  request_id: string;
  status: string;
}
export interface TJob {
  employer_name: string;
  employer_company_type: string;
  job_job_title: string;
  job_description: string;
  job_employment_type: string;
  job_country: string;
  job_id: string;
  job_title: string;
  employer_logo: string;
}

const Search: React.FC = () => {
  const [inputStr, setInputStr] = useState("");
  const [query, setQuery] = useState("");

  const {
    data: jobs,
    error,
    isLoading,
  } = useSWR<TJobs>(
    query
      ? [`https://jsearch.p.rapidapi.com/search?query=${query}`, "GET"]
      : null,
    fetcher as any
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStr(e.target.value);
  };
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(inputStr);
  };
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

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center pt-32">
        <form className="w-full max-w-md" onSubmit={onSubmitForm}>
          <div className="w-full max-w-md">
            <p className="text-center uppercase text-gray-500 p-4">
              Find your best job:
            </p>
            <div className="relative">
              <input
                onChange={onChangeInput}
                type="text"
                className=" w-full h-12 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
                placeholder="Search jobs..."
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M9 15a6 6 0 100-12 6 6 0 000 12z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      {error && (
        <p className="text-center text-gray-500 mt-6">Failed to load</p>
      )}
      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Loading...</p>
      )}
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
      {jobs?.data.length === 0 && (
        <p className="text-center text-red-400 pt-4">no such jobs</p>
      )}
    </div>
  );
};

export default Search;
