"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState<any>({});
  const { id } = useParams();

  // Fetch jobs whenever page or debouncedQuery changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${API}/api/jobs/getJobDetails/${id}`,
        );
        const data = await res.json();
        setJobDetails(data || {});
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, [id]);

  return (
    <>
      <Breadcrumb pageName={jobDetails?.title} description="" />

      <section className="pb-[60px]">
        <div className="container">
          <p className="mb-6 text-body-color">{jobDetails?.description}</p>

          <Link
            href={{
              pathname:`/apply-now`,
              query:{
                id:jobDetails._id,
                title:jobDetails.title
              }
            }}
            className="rounded-md bg-blue-700  px-6 py-3 text-sm text-white"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
