"use client";

import { Suspense } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useSearchParams } from "next/navigation";

function ContactContent() {
  const params = useSearchParams();
  const jobId = params.get("id");
  const title = params.get("title");

  return (
    <>
      <Breadcrumb pageName="Apply Now" description={title || ""} />
      <Contact jobId={jobId} />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
