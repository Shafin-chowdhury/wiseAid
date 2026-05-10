import { Button } from "./ui/button";

export default function EmergencyPanel() {
  return (
    <div className="flex justify-center py-10">
      <Button size="lg" variant="destructive" className="w-64 h-64 rounded-full text-3xl font-bold shadow-2xl">
        SOS HELP
      </Button>
    </div>
  );
}