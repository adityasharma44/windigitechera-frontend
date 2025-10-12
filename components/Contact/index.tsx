"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import uploadFileIcon from "../../assets/upload.png";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const inputClass =
  "w-full rounded-md border border-stroke bg-[#f8f8f8] px-3 py-2.5 text-sm text-body-color outline-none " +
  "focus:border-primary";

const labelClass =
  "mb-2 block text-sm font-medium text-dark";

const radioClass =
  "mr-2 rounded-md border border-stroke bg-[#f8f8f8] text-body-color " +
  "focus:border-primary";

const Contact = ({ jobId, type = "job" }: { jobId?: string | null; type?: "job" | "register" }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [applicationData, setApplicationData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setApplicationData({ ...applicationData, resumeFile: file });
  };

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(e:React.ChangeEvent<T>) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => {
      return { ...prevData, [name]: value }
    })
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    Object.entries(applicationData).forEach(([key,value])=>{
      formData.append(key,value as string | Blob)
    })
    
    // Add type field
    formData.append("type", type);
    
    // Only add jobId if type is "job"
    if (type === "job" && jobId) {
      formData.append("jobId", jobId);
    }

    try {
    const response = await fetch(`${API}/api/application/apply/resumes`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      const successMessage = type === "job" ? "Application submitted successfully!" : "Registration submitted successfully!";
      toast.success(successMessage);
      // Reset form
      setApplicationData({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      toast.error(result.message || "Failed to submit");
    }
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
  }

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-2.5">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-white px-4 py-4 shadow-three 
              sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[40px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-2 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                {type === "job" ? "Apply for this Position" : "Register Your Profile"}
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                {type === "job" 
                  ? "Share your skills and experience below so that we can connect with you for this job." 
                  : "Register your profile with us and we'll connect you with relevant opportunities."}
              </p>

              {/* ✅ Form */}
              <form onSubmit={(e) => handleSubmit(e)} className="-mx-4 flex flex-wrap">
                {/* Name */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label htmlFor="name" className={labelClass}>
                      Your Name
                    </label>
                    <input type="text" name="name" placeholder="Enter your name" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* Email */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label htmlFor="email" className={labelClass}>
                      Your Email
                    </label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* Phone */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number
                    </label>
                    <input type="number" name="phone" placeholder="Enter with Country Code" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* Address */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Address</label>
                    <input type="text" name="address" placeholder="Address" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* City */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>City</label>
                    <input type="text" name="city" placeholder="City" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* State */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>State</label>
                    <input type="text" name="state" placeholder="State" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* Country */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Country</label>
                    <input type="text" name="country" placeholder="Country" onChange={(e) => handleChange(e)} className={inputClass} />
                  </div>
                </div>

                {/* Years of Exp */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Years of Experience</label>
                    <input type="text" name="yearsOfExp" onChange={(e) => handleChange(e)} placeholder="Enter 0 if fresher" className={inputClass} />
                  </div>
                </div>

                {/* Degree */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Course Details</label>
                    <input type="text" name="degree" onChange={(e) => handleChange(e)} placeholder="BE/Btech/MCA Etc" className={inputClass} />
                  </div>
                </div>

                {/* Year of Passing */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Year of Passing</label>
                    <input type="text" name="yearOfPassing" onChange={(e) => handleChange(e)} placeholder="Year" className={inputClass} />
                  </div>
                </div>

                {/* Gender */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Gender</label>
                    <div className="flex items-center space-x-6">
                      {["Male", "Female", "Other"].map((g) => (
                        <label key={g} className="flex items-center text-md font-medium text-body-color">
                          <input type="radio" name="gender" onChange={(e) => handleChange(e)} value={g} className={radioClass} />
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Marital Status */}
                <div className="w-full px-2 md:w-1/3">
                  <div className="mb-5">
                    <label className={labelClass}>Marital Status</label>
                    <div className="flex items-center space-x-6">
                      {["Married", "Single"].map((status) => (
                        <label
                          key={status}
                          className="flex items-center text-md font-medium text-body-color"
                        >
                          <input type="radio" name="maritalStatus" onChange={(e) => handleChange(e)} value={status} className={radioClass} />
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="w-full px-2">
                  <div className="mb-4">
                    <label htmlFor="skills" className={labelClass}>
                      Details of Skills and Technology
                    </label>
                    <textarea
                      name="detailsOfSkills"
                      rows={5} onChange={(e) => handleChange(e)}
                      placeholder="For example: Java, PHP, Cloud, IT, HR, Big Data..."
                      className={`${inputClass} resize-none`}
                    ></textarea>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="w-full px-2">
                  <div className="mb-5">
                    <label className={labelClass}>Upload your Resume</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf"
                    />
                    <button
                      type="button"
                      onClick={handleButtonClick}
                      className="rounded-md border border-dashed border-gray-400 bg-[#f8f8f8] p-5 text-sm text-body-color 
                        outline-none flex flex-col items-center justify-center
                        focus:border-primary"
                    >
                      <Image alt="upload file icon" className="h-[120px] w-[120px]" src={uploadFileIcon} />
                      Click to upload resume
                    </button>
                    {applicationData.resumeFile && (
                      <div className="mt-3 flex items-center gap-2 rounded-md bg-green-50 border border-green-200 px-4 py-2.5">
                        <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-green-700 font-medium truncate">
                          {applicationData.resumeFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setApplicationData({ ...applicationData, resumeFile: null });
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="ml-auto text-green-600 hover:text-green-800 flex-shrink-0"
                          title="Remove file"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="w-full px-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading && (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? "Submitting..." : "Submit Details"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </section>
  );
};

export default Contact;
