import { cn } from "@/lib/utils";

/**
 * The hairline gray divider — second half of the signature motif.
 * REVAMP_PLAN §6.1.
 */
export default function SectionRule({ className, width = "sm", tone = "default" }) {
  // "accent" = the Option 2 divider: a full-width line with an orange tip.
  // Uses --c-* theme vars so it also follows dark mode.
  if (tone === "accent") {
    return (
      <span
        aria-hidden="true"
        className={cn("block h-0.5 w-full rounded-full my-4", className)}
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--c-orange)) 0%, rgb(var(--c-orange) / 0.25) 20%, rgb(var(--c-hairline)) 20%)",
        }}
      />
    );
  }
  const widthCls = { sm: "w-16", md: "w-24", lg: "w-40", full: "w-full" }[width] || "w-16";
  const toneCls = tone === "orange" ? "bg-brand-orange" : "bg-brand-hairline";
  return <span className={cn("block h-px my-4", widthCls, toneCls, className)} />;
}
