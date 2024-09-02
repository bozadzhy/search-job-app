"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/api/api";
import { TJobs } from "../Search/Search";
import { usePathname } from "next/navigation";

const JobDetails: React.FC = () => {
  const pathName = usePathname();
  const id = pathName.slice(13);

  const {
    data: job,
    error,
    isLoading,
  } = useSWR<TJobs>(
    id
      ? [`https://jsearch.p.rapidapi.com/job-details?job_id=${id}`, "GET"]
      : null,
    fetcher as any
  );
  if (error) return <p className="text-center">Error.</p>;
  if (isLoading) return <p className="text-center">Loading...</p>;
  return (
    <div className="flex flex-col">
      {job?.data &&
        job.data.map((job) => (
          <div key={job.job_id}>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
              {" "}
              <img src={job.employer_logo} alt="logo" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {job.job_title}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Employer:</span>{" "}
                {job.employer_name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Employment type:</span>{" "}
                {job.job_employment_type}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Location:</span>{" "}
                {job.job_country}
              </p>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Description:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {job.job_description}
              </p>
              <button
                disabled
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobDetails;
