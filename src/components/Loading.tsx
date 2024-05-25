import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex flex-row justify-center items-center gap-4 text-2xl text-muted-foreground">
      <Loader2 className="animate-spin" />
      Loading..
    </div>
  );
}
