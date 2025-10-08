import { Job } from "@/types/job";
import moment from "moment";
import Link from "next/link";

const SingleJob = ({ job }: { job: Job }) => {
  const { title, description, createdAt } = job;
  return (
    <>
      <div
        className="wow fadeInUp hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 dark:bg-dark"
        data-wow-delay=".1s"
      >
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/blog-details"
              className="mb-4 block text-xl capitalize font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-sm font-medium text-body-color dark:border-white dark:border-opacity-10">
            {description.slice(0,200)}
          </p>
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{moment(createdAt).format("DD-MMM-YYYY")}</p>
            </div>
            <div className="">
              <Link href={`/job-details/${job._id}`} className="rounded-lg bg-blue-700 text-white py-2 text-sm px-5">View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleJob;
