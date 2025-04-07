import React from "react";
import PrivacySettingsSection from "@/sections/PrivacySettings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

interface SettingProps {}

const Setting: React.FC<SettingProps> = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  }
  if (!session) {
    router.replace("/auth/signin");
    return null;
  }
  return (
    <div>
      <div className="w-full h-24 bg-black" />
      <div className="mx-auto lg:max-w-7xl px-4 md:px-8  w-full">
        <PrivacySettingsSection />
      </div>
    </div>
  );
};

export default Setting;
