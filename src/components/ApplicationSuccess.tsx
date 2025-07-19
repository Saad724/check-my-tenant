import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const ApplicationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="mt-8 flex items-center justify-center rounded-full bg-accent">
        <Image src="/sucess.svg" alt="Success IMG" width={100} height={100} />
      </div>

      <h3 className="text-xl font-medium text-black">
        Application form submitted
      </h3>

      <p>We have sent a copy of the form to your email</p>

      <Dialog>
        <DialogTrigger asChild>
          <Link href="/">
            <Button className="mt-5 px-4 py-3" variant="secondary">
              Revoke your application
            </Button>
          </Link>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationSuccess;
