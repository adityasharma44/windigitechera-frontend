"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useSearchParams } from "next/navigation";

const ContactPage = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const title = params.get("title");
  return (
    <>
      <Breadcrumb
        pageName="Apply Now"
        description={`${title}`}
      />

      <Contact jobId={id} />
    </>
  );
};

export default ContactPage;
