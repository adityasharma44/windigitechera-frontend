"use client";
import { useState } from "react";

const labelClass =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
  "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " +
  "dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white";

const buttonClass =
  "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
  "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " +
  "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

type AddJobProps = {
  handleJobModalOpen: () => void;
  onJobAdded:()=>void;
};

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const AddJob = ({ handleJobModalOpen,onJobAdded }: AddJobProps) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/jobs/addJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add job");
      onJobAdded();
      setFormData({ title: "", description: "" });
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 
           justify-center items-center w-full md:inset-0 h-screen max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg border shadow-md border-gray-300 dark:border-0 dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:py-4 md:px-5 border-b rounded-t border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Job
            </h3>
            <button
              type="button"
              onClick={handleJobModalOpen}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                     rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center 
                     dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Form */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Job Title */}
              <div>
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="eg. Full Stack Developer"
                  required
                />
              </div>

              {/* Job Description */}
              <div>
                <label className={labelClass}>Job Description</label>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role..."
                  className={inputClass}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className={buttonClass} disabled={loading}>
                {loading ? "Adding..." : "Add Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
