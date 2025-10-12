"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

const RegisterPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Register Your Profile"
        description="Join our talent pool and get connected with exciting opportunities"
      />

      <Contact type="register" />
    </>
  );
};

export default RegisterPage;
