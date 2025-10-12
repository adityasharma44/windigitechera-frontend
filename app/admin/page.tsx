"use client";

import AddJob from "@/components/Jobs/AddJob";
import ShowJobList from "@/components/Jobs/ShowJobList";
import RegistrationsList from "@/components/Admin/RegistrationsList";
import { useState } from "react";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState<"jobs" | "registrations">("jobs");
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    
    const handleJobModalOpen = () => {
        setShowAddJobModal(!showAddJobModal)
    }

    const onSuccessJobAdded = () => {
        setRefresh(!refresh)
        setShowAddJobModal(false)
    }

    return (
        <>
            <section className="pt-28 lg:pt-[100px] container">
                {/* Tabs */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex gap-2 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab("jobs")}
                            className={`px-6 py-3 text-sm font-semibold transition-colors ${
                                activeTab === "jobs"
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Jobs
                        </button>
                        <button
                            onClick={() => setActiveTab("registrations")}
                            className={`px-6 py-3 text-sm font-semibold transition-colors ${
                                activeTab === "registrations"
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Registrations
                        </button>
                    </div>

                    {/* Add Job Button - Only show in Jobs tab */}
                    {activeTab === "jobs" && (
                        <button
                            onClick={() => handleJobModalOpen()}
                            className="bg-blue-600 text-white rounded-md px-4 py-2 font-semibold text-sm hover:bg-blue-700 transition-colors"
                        >
                            Add Job
                        </button>
                    )}
                </div>

                {/* Add Job Modal */}
                {showAddJobModal && (
                    <AddJob handleJobModalOpen={handleJobModalOpen} onJobAdded={onSuccessJobAdded} />
                )}

                {/* Content based on active tab */}
                {activeTab === "jobs" ? (
                    <ShowJobList refresh={refresh} />
                ) : (
                    <RegistrationsList />
                )}
            </section>
        </>
    );
};

export default AdminPage;
