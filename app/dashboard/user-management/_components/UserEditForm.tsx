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
import { useUpdateSingleUserByIdMutation } from "@/redux/features/user-management/user-management.api";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserEdit {
  name: string;
  email: string;
  // username: string;
  // status: string;
}

const UserEditForm = ({
  defaultValue,
  id,
  onUpdateDone,
}: {
  id: string | undefined;
  defaultValue: Partial<UserEdit> & {};
  onUpdateDone: () => void;
}) => {
  const form = useForm<UserEdit>({
    defaultValues: {
      name: defaultValue?.name ?? "",
      email: defaultValue?.email ?? "",
    },
  });

  const [updateSingleUserById, { isLoading }] =
    useUpdateSingleUserByIdMutation();

  const onSubmit = async (values: UserEdit) => {
    if (!id) return;

    try {
      await updateSingleUserById({
        id: id,
        data: {
          name: values.name,
          email: values.email,
        },
      }).unwrap();

      toast.success("User updated successfully");
      onUpdateDone();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update user"));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#B2B5B8]">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="User's full name"
                  {...field}
                  className="bg-[#1D1F2C] border border-[#1D1F2C] text-[#DFE1E7] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#1D1F2C]"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField */}
        {/*   control={form.control} */}
        {/*   name="username" */}
        {/*   render={({ field }) => ( */}
        {/*     <FormItem> */}
        {/*       <FormLabel>User Name</FormLabel> */}
        {/*       <FormControl> */}
        {/*         <Input */}
        {/*           placeholder="@username" */}
        {/*           {...field} */}
        {/*           className="bg-[#1D1F2C] border border-[#1D1F2C] text-[#DFE1E7] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#1D1F2C]" */}
        {/*         /> */}
        {/*       </FormControl> */}
        {/**/}
        {/*       <FormMessage /> */}
        {/*     </FormItem> */}
        {/*   )} */}
        {/* /> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@email.com"
                  {...field}
                  className="bg-[#1D1F2C] border border-[#1D1F2C] text-[#DFE1E7] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#1D1F2C]"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField */}
        {/*   control={form.control} */}
        {/*   name="status" */}
        {/*   render={({ field }) => ( */}
        {/*     <FormItem> */}
        {/*       <FormLabel>Status</FormLabel> */}
        {/*       <FormControl> */}
        {/*         <Select value={field.value} onValueChange={field.onChange}> */}
        {/*           <SelectTrigger */}
        {/*             className="bg-[#1D1F2C] border border-[#1D1F2C] text-[#DFE1E7] */}
        {/*     outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 */}
        {/*     focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" */}
        {/*           > */}
        {/*             <SelectValue>{field.value || "Select status"}</SelectValue> */}
        {/*           </SelectTrigger> */}
        {/**/}
        {/*           <SelectContent> */}
        {/*             <SelectItem value="Active">Active</SelectItem> */}
        {/*             <SelectItem value="Inactive">Inactive</SelectItem> */}
        {/*           </SelectContent> */}
        {/*         </Select> */}
        {/*       </FormControl> */}
        {/**/}
        {/*       <FormMessage /> */}
        {/*     </FormItem> */}
        {/*   )} */}
        {/* /> */}

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
  );
};

export default UserEditForm;
