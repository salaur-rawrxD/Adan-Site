import { Navbar } from "@/components/site";
import { SnapshotDiagnostic } from "./snapshot-diagnostic";

export default function SnapshotPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0D14] text-[#F8FAFC]">
      <Navbar />
      <SnapshotDiagnostic />
    </main>
  );
}
