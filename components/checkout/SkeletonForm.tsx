import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const SkeletonForm = () => {
  return (
    <Card className="bg-white w-[320px] flex flex-col items-center h-[500px] hover:scale-[1.05] transition duration-300">
      <CardHeader className="space-y-2 h-32 w-full">
        <CardTitle className="text-center w-full">
          <Skeleton className="h-6 w-full" />
        </CardTitle>
        <CardDescription className="w-full">
          <Skeleton className="h-16 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-12">
        <div className="text-xl font-bold text-gray-700"></div>
      </CardContent>
      <CardFooter className="mt-auto w-full">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
