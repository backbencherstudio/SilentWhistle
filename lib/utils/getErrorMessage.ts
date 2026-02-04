export function getErrorMessage(
  error: unknown,
  defaultMessage = "Something went wrong. Please try again.",
): string {
  if (!error) return defaultMessage;

  // RTK Query / fetchBaseQuery error shape
  if (typeof error === "object" && error !== null) {
    const err = error as any;

    if (typeof err?.data?.message === "string") {
      return err.data.message;
    }

    if (typeof err?.error === "string") {
      return err.error;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}
