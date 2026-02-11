"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getErrorMessage } from "@/lib/utils";
import { useUpdateAdminProfileByIdMutation } from "@/redux/features/profile/profile.api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { showDashboardToast } from "../ui/CustomToast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";

const userEditSchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  email: z.email("Invalid email address"),
  address: z.string().max(255, "Address is too long").optional(),
});

export type UserEdit = z.infer<typeof userEditSchema>;

const SystemSettingsForm = ({
  open,
  onOpenChange,
  id,
  defaultValue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
  defaultValue?: Partial<UserEdit>;
}) => {
  const form = useForm<UserEdit>({
    defaultValues: {
      name: defaultValue?.name ?? "",
      email: defaultValue?.email ?? "",
      address: defaultValue?.address ?? "",
    },
    resolver: zodResolver(userEditSchema),
  });

  const [updateAdminProfile, { isLoading }] =
    useUpdateAdminProfileByIdMutation();

  const onSubmit = async (values: UserEdit) => {
    if (!id) return;

    try {
      await updateAdminProfile({
        id: id,
        profile: values,
      }).unwrap();

      showDashboardToast({
        variant: "success",
        title: "User updated successfully",
      });
      onOpenChange(false);
    } catch (error) {
      showDashboardToast({
        variant: "error",
        title: "Failed to update user",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-4xl border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Update Profile Info
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#B2B5B8]">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fullname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username Field */}
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="username" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel className="text-[#B2B5B8]">Username</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input placeholder="Enter username" {...field} /> */}
            {/*       </FormControl> */}
            {/*       <FormMessage /> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#B2B5B8]">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-[#B2B5B8]">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="col-span-2 mt-4 w-full rounded-xl bg-[#0C2A16] text-[#58FF9E] hover:bg-[#0E341B] h-11 font-medium"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Updating
                </>
              ) : (
                <>Update</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SystemSettingsForm;
