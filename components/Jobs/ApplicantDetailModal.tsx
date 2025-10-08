"use client";

export type Applicant = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  yearsOfExp: number;
  degree: string;
  yearOfPassing: number;
  gender: string;
  maritalStatus: string;
  detailsOfSkills: string;
  resumeFile: string;
};

type ApplicantModalProps = {
  handleClose: () => void;
  applicant: Applicant;
};

const ApplicantDetailModal = ({ handleClose, applicant }: ApplicantModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Applicant Details
          </h3>
          <button
            onClick={handleClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7L1 13" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-3">
          {[
            { label: "Name", value: applicant.name },
            { label: "Email", value: applicant.email },
            { label: "Phone", value: applicant.phone },
            { label: "Address", value: applicant.address },
            { label: "City", value: applicant.city },
            { label: "State", value: applicant.state },
            { label: "Country", value: applicant.country },
            { label: "Years of Experience", value: applicant.yearsOfExp },
            { label: "Degree", value: applicant.degree },
            { label: "Year of Passing", value: applicant.yearOfPassing },
            { label: "Gender", value: applicant.gender },
            { label: "Marital Status", value: applicant.maritalStatus },
            { label: "Skills", value: applicant.detailsOfSkills },
            // {
            //   label: "Applied On",
            //   value: new Date(applicant.createdAt).toLocaleString(),
            // },
          ].map((field) => (
            <div key={field.label} className="flex">
              <span className="w-40 font-medium text-gray-700 dark:text-gray-300">
                {field.label}:
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                {field.value}
              </span>
            </div>
          ))}
          <div className="">
            <a target="_blank" rel="noreferrer" className="bg-blue-600 py-2 px-3 text-white rounded-md" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/resumes/${applicant.resumeFile}`}>View Resume</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailModal;
