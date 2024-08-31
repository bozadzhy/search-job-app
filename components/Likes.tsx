"use client";
import { useEffect, useState } from "react";
import { TJob } from "@/components/Search";
import Link from "next/link";

const Likes:React.FC = () => {
  const [likedArr, setLikedArr] = useState<TJob[]>([]);

  useEffect(() => {
    const likedJobsStr = localStorage.getItem("liked-jobs");
    if (likedJobsStr) {
      const jobs = JSON.parse(likedJobsStr);
      setLikedArr(jobs);
    }
  }, []);

  const handleDelete = (id: string) => {
    const findJob = likedArr.find((job) => job.job_id === id);
    const likedJobsStr = localStorage.getItem("liked-jobs");
    if (likedJobsStr) {
      const jobs = JSON.parse(likedJobsStr);
      const filteredJobs = jobs.filter(
        (job: TJob) => job.job_id !== findJob?.job_id
      );
      localStorage.setItem("liked-jobs", JSON.stringify(filteredJobs));
      setLikedArr(filteredJobs);
    }
  };
  return (
    <div>
      <h1 className="text-center text-gray-600">Liked Jobs:</h1>
      {likedArr.length === 0 ? (
        <p className="text-center text-gray-400">No liked jobs</p>
      ) : (
        <ul className="mt-6 flex justify-center flex-col items-center">
          {likedArr.map((job, i) => (
            <div
              key={job.job_description + i}
              className="mb-4 min-w-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {job.job_job_title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {job.employer_company_type}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {job.job_employment_type}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {job.employer_name}
                  </span>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link
                    href={`job-details/${job.job_id}`}
                    className="text-white rounded border p-2 bg-blue-600 text-white-500 hover:bg-blue-500 font-semibold"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleDelete(job.job_id)}
                    className="text-white rounded border p-2 bg-yellow-300 hover:bg-yellow-200 font-semibold "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Likes;
