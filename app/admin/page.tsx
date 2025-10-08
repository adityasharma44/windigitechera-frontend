"use client";

import AddJob from "@/components/Jobs/AddJob";
import ShowJobList from "@/components/Jobs/ShowJobList";
import { useState } from "react";

const AdminPage = () => {
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const handleJobModalOpen = () => {
        setShowAddJobModal(!showAddJobModal)
    }

    const onSuccessJobAdded=()=>{
        setRefresh(!refresh)
        setShowAddJobModal(false)
    }

    return (
        <>
            <section className="pt-28 lg:pt-[100px] container">
                <div className="flex justify-end">
                    <button onClick={() => handleJobModalOpen()} className="bg-blue-600 text-white rounded-md px-3 py-2 font-semibold text-sm">Add Job</button>
                </div>
                {
                    showAddJobModal && <AddJob handleJobModalOpen={handleJobModalOpen} onJobAdded={onSuccessJobAdded} />
                }
                <ShowJobList refresh = {refresh}/>
            </section>
        </>
    );
};

export default AdminPage;
