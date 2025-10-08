"use client";

import SingleJob from "@/components/Blog/SingleJob";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const Blog = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Read current page from query params
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Handle pagination
  const handleMove = (num: number) => {
    const newPage = Math.max(page + num, 1);
    router.push(`?page=${newPage}&q=${debouncedQuery}`);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      router.push(`?page=1&q=${query}`);
    }, 700);

    return () => clearTimeout(timer);
  }, [query,router]);

  // Fetch jobs whenever page or debouncedQuery changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${API}/api/jobs/getJobs?page=${page}&q=${debouncedQuery}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, [page, debouncedQuery]);

  return (
    <>
      <Breadcrumb
        pageName="Available Postings"
        description="These projects have been shared by clients and are open for collaboration. Apply directly to get hired."
      />

      <section className="pb-[60px] pt-[15px]">
        <div className="container">
          {/* 🔎 Search Bar */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 md:w-[420px]"
            />
          </div>

          {/* Jobs List */}
          <div className="flex flex-wrap justify-center">
            {jobs.map((job) => (
              <div
                key={job?._id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleJob job={job} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-4">
            {page > 1 && (
              <button
                onClick={() => handleMove(-1)}
                className="rounded bg-gray-200 px-4 py-2"
              >
                Previous
              </button>
            )}

            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>

            {page < totalPages && (
              <button
                onClick={() => handleMove(1)}
                className="rounded bg-gray-200 px-4 py-2"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
