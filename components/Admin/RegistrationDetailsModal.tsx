"use client";

import { AiOutlineClose } from "react-icons/ai";

type Registration = {
  _id: string;
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
  createdAt: string;
};

type Props = {
  registration: Registration;
  onClose: () => void;
};

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const RegistrationDetailsModal = ({ registration, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50">
      <div className="relative w-full max-w-4xl p-4">
        <div className="relative rounded-lg border border-gray-300 bg-white shadow-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 bg-gray-50 p-4 sticky top-0 z-10">
            <h3 className="text-xl font-semibold text-gray-900">
              Registration Details
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="text-base text-gray-900">{registration.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-base text-gray-900">{registration.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-base text-gray-900">{registration.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Gender</label>
                  <p className="text-base text-gray-900">{registration.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Marital Status</label>
                  <p className="text-base text-gray-900">{registration.maritalStatus}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                Address Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <p className="text-base text-gray-900">{registration.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">City</label>
                  <p className="text-base text-gray-900">{registration.city}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">State</label>
                  <p className="text-base text-gray-900">{registration.state}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Country</label>
                  <p className="text-base text-gray-900">{registration.country}</p>
                </div>
              </div>
            </div>

            {/* Education & Experience */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                Education & Experience
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Degree</label>
                  <p className="text-base text-gray-900">{registration.degree}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Year of Passing</label>
                  <p className="text-base text-gray-900">{registration.yearOfPassing}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Years of Experience</label>
                  <p className="text-base text-gray-900">{registration.yearsOfExp} years</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                Skills & Technology
              </h4>
              <p className="text-base text-gray-900 whitespace-pre-wrap">{registration.detailsOfSkills}</p>
            </div>

            {/* Resume */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                Resume
              </h4>
              <a
                href={`${API}/uploads/resumes/${registration.resumeFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Download Resume
              </a>
            </div>

            {/* Registration Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Registered On</label>
              <p className="text-base text-gray-900">
                {new Date(registration.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end rounded-b border-t border-gray-200 p-4">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetailsModal;
