"use client";

import { useRouter } from "next/navigation";
import { ConstraintEngineHero } from "@/components/constraint-engine";

export default function ConstraintPage() {
  const router = useRouter();

  const handleRunDiagnostic = (nodeId: string) => {
    // Route to snapshot with context
    router.push(`/snapshot?focus=${nodeId}`);
  };

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0B0B0C" }}>
      <ConstraintEngineHero onRunDiagnostic={handleRunDiagnostic} />
    </main>
  );
}
