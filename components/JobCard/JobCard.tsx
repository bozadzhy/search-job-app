"use client";
import React from "react";
import { TJob } from "../Search/Search";
import Link from "next/link";

interface JobCardProps {
  job: TJob;
  handleLikeClick: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, handleLikeClick }) => {
  return (
    <div className="mt-12 flex justify-center flex-col items-center">
      <div className="mb-4 min-w-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">
            {job.job_job_title}
          </h3>
          <p className="text-gray-600 mt-2">{job.employer_company_type}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              {job.job_employment_type}
            </span>
            <span className="text-gray-500 text-sm">{job.employer_name}</span>
          </div>
          <div className="mt-4 flex justify-between">
            <Link
              href={`job-details/${job.job_id}`}
              className="text-white rounded border p-2 bg-blue-600 text-white-500 hover:bg-blue-500 font-semibold"
            >
              Details
            </Link>
            <button
              onClick={() => handleLikeClick(job.job_id)}
              className="text-white rounded border p-2 bg-yellow-300 hover:bg-yellow-200 font-semibold "
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
