"use client";
import React, { Suspense, useEffect, useState } from "react";
import LicenseRequest from "./licenseRequest";
import Loading from "../Loading";
import { Separator } from "@radix-ui/react-separator";
import TrasnferLicense from "./trasnferLicense";
import { Skeleton } from "@/components/ui/skeleton";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { getUserInfo } from "@/lib";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context";

export default function LicenseRequestRoot() {
  const [user, setuser] = useState([]);
  const { Loading, setLoading , co_license, setco_license } = useAppContext();

  const getGroupInfo = async () => {
    setLoading(true);
    if(user?.user?.username) setco_license(await EXEC_API({ SQLID: 19, VAL1: user?.user?.username }));
    setLoading(false);
  };

  const getSession = async () => {
    setuser(await getUserInfo());
  };
  useEffect(() => {
    getSession();
  }, []);
  useEffect(() => {
    getGroupInfo();
  }, [user]);
  const LoadingTemplte = () => {
    return (
      <>
        <div className="flex justify-between mb-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className=" flex gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        {Loading ? (
          <LoadingTemplte />
        ) : (
          <LicenseRequest user={user} co_license={co_license} />
        )}
      </Suspense>
      <Separator className="my-4" />
      <p className="font-medium">License co-user</p>
      <p className="text-muted-foreground text-xs">
        You can also transfer your license to other user on the list <br />
        Note: that this will kick your SAP B1 Session so please save your work
        first
      </p>
      <Suspense fallback={<Loading />}>
        {Loading ? (
          <>
            <LoadingTemplte />
            <LoadingTemplte />
            <LoadingTemplte />
          </>
        ) : (
          <TrasnferLicense user={user}  />
        )}
      </Suspense>
      {/* <Button onClick={() => console.log(co_license)}></Button> */}
    </div>
  );
}