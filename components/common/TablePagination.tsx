"use client";

import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    showRefresh?: boolean;
    onRefresh?: () => void;
    isFetching?: boolean;
}
const TablePagination = ({ page, totalPages, onPageChange, pageSize, onPageSizeChange, pageSizeOptions = [10, 20, 50], showRefresh = false, onRefresh, isFetching }: PaginationProps) => {
    const getPages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (page > 3) pages.push("...");

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (page < totalPages - 2) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    }
    return (
        <div className="flex items-center justify-between gap-4 mt-6 w-fit">
            {/* Left: Previous */}
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="px-4 h-10 rounded-lg bg-neutral-900 text-gray-300 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            {/* Center: Page numbers */}
            <div className="flex items-center bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                {getPages().map((item, index) =>
                    item === "..." ? (
                        <span
                            key={index}
                            className="px-3 text-gray-400 text-sm"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => onPageChange(item)}
                            className={`w-10 h-10 text-sm font-medium transition-colors ${page === item
                                ? "bg-[#22c55e] text-black"
                                : "text-gray-300 hover:bg-neutral-800"
                                }`}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            {/* Right: Next + Refresh + Page size */}
            <div className="flex items-center gap-3">
                {showRefresh && onRefresh && (
                    <button
                        onClick={onRefresh}
                        disabled={isFetching}
                        className="w-10 h-10 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-gray-300 disabled:opacity-50"
                    >
                        <RotateCw
                            size={16}
                            className={`transition-transform duration-300 ${isFetching ? "animate-spin" : ""}`}
                        />
                    </button>
                )}

                {onPageSizeChange && (
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="h-10 px-3 rounded-lg bg-neutral-900 text-gray-300 border border-neutral-800 text-sm cursor-pointer"
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size} / page
                            </option>
                        ))}
                    </select>
                )}

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-4 h-10 rounded-lg bg-neutral-900 text-gray-300 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default TablePagination;