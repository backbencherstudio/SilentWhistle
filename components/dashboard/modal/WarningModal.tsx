"use client";

import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitDone: (warnReasons: string[]) => void;
}

const warningData = {
  id: "privacy_responsibility_warning",
  type: "warning_modal",
  title: "Privacy & Responsibility Warning",
  description: null,
  items: [
    {
      id: "anonymous",
      text: "Your report may be submitted anonymously.",
      required: false,
      defaultChecked: true,
    },
    {
      id: "no_false_info",
      text: "Do not include false information.",
      required: true,
      defaultChecked: false,
    },
    {
      id: "no_disputes",
      text: "Do not use this platform for personal disputes or revenge.",
      required: true,
      defaultChecked: false,
    },
    {
      id: "misuse_action",
      text: "Misuse of this system may result in action by your organization.",
      required: true,
      defaultChecked: false,
    },
  ],
  cta: {
    label: "Send",
    action: "submit_report",
    disabledUntilAllRequiredChecked: true,
  },
};

type FormValues = Record<string, boolean>;

const WarningModal = ({ open, onOpenChange, onSubmitDone }: ModalProps) => {
  const defaultValues = useMemo(() => {
    const values: Record<string, boolean> = {};
    warningData.items.forEach((item) => {
      values[item.id] = item.defaultChecked;
    });
    return values;
  }, []);

  const form = useForm<FormValues>({
    defaultValues,
  });

  function onSubmit(data: FormValues) {
    onOpenChange(false);
    // Extract the keys that are true
    onOpenChange(false);

    // Extract the keys that are true
    const trueKeys: string[] = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    // Get the corresponding texts from warningData.items
    const trueTexts = warningData.items
      .filter((item) => trueKeys.includes(item.id))
      .map((item) => item.text);

    onSubmitDone(trueTexts);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm" />

      <DialogContent
        showCloseButton={false}
        className="max-w-130 border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl"
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold flex flex-col items-center gap-3.5">
            <div className="bg-[#003515] p-3 rounded-full">
              <InfoIcon />
            </div>
            <p className="font-semibold text-lg leading-[110%]">
              Standard Warning
            </p>
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm leading-[160%] text-[#D2D2D5] text-center">
            Silent Whistle is intended for reporting genuine workplace concerns.
            Submitting false, misleading, or malicious reports may lead to
            disciplinary action according to organizational policy.
          </p>

          <p className="text-sm leading-[160%] text-[#D2D2D5]">
            All reports should be made honestly and responsibly.
          </p>
        </div>

        {/* Warning List */}
        <div className="mt-4">
          <h1 className="font-medium text-lg leading-[160%]">
            {warningData.title}
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
            >
              {warningData.items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={item.id}
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          id={item.id}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="size-6 border-white/30 data-[state=checked]:border-[#005C25] data-[state=checked]:bg-[#064816]"
                        />
                      </FormControl>

                      <Label
                        htmlFor={item.id}
                        className="text-sm text-[#D2D2D5] leading-[160%]"
                      >
                        {item.text}
                      </Label>
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#0D1F13] hover:bg-[#0D1F13] text-[#38E07B] font-semibold"
              >
                {warningData.cta.label}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
