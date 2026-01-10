"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, XCircle, Info } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

interface DashboardToastProps {
    variant?: ToastVariant;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    duration?: number;
}

const variantConfig = {
    success: {
        icon: <Check className="w-6 h-6 text-[#38E07B]" />,
        iconBg: "bg-[#003515] border-[#005C25]",
        bar: "bg-[#38E07B]",
    },
    error: {
        icon: <XCircle className="w-6 h-6 text-red-400" />,
        iconBg: "bg-[#2A0C0C] border-red-500/40",
        bar: "bg-red-400",
    },
    info: {
        icon: <Info className="w-6 h-6 text-cyan-400" />,
        iconBg: "bg-[#0A1A22] border-cyan-500/40",
        bar: "bg-cyan-400",
    },
};

export const showDashboardToast = ({
    variant = "success",
    title,
    description,
    actionLabel,
    onAction,
    duration = 4000,
}: DashboardToastProps) => {
    const config = variantConfig[variant];

    toast.custom(
        (t) => (
            <div className="w-105 rounded-2xl bg-[#0D0F10]/95 border border-white/10 shadow-2xl px-4 py-4 relative overflow-hidden">
                {/* Close */}
                <button
                    onClick={() => toast.dismiss(t)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition"
                >
                    ✕
                </button>

                <div className="flex gap-4">
                    {/* Icon */}
                    <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center border ${config.iconBg}
              shadow-[0_0_40px_rgba(56,224,123,0.2)]`}
                    >
                        {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-[16px] font-semibold text-white">{title}</h3>

                        {description && (
                            <p className="text-[13px] text-white/60 mt-1 leading-[150%]">
                                {description}
                            </p>
                        )}

                        {/* Action button */}
                        {actionLabel && onAction && (
                            <Button
                                onClick={() => {
                                    toast.dismiss(t);
                                    onAction();
                                }}
                                className="mt-4 h-10 px-4 rounded-xl bg-[#0D1F13] hover:bg-[#0D1F13] text-[#38E07B] font-semibold"
                            >
                                {actionLabel}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Progress Line */}
                <div className="absolute bottom-0 left-0 w-full h-0.75 bg-white/5">
                    <div
                        className={`h-full ${config.bar} w-full animate-toast-progress`}
                        style={{ animationDuration: `${duration}ms` }}
                    />
                </div>
            </div>
        ),
        { duration }
    );
};
