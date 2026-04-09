import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDoctor } from "@/types/doctor.interface";
import {
  Briefcase,
  Calendar,
  DollarSign,
  GraduationCap,
  Hospital,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

interface DoctorProfileContentProps {
  doctor?: IDoctor;
}

const DoctorProfileContent = ({ doctor }: DoctorProfileContentProps) => {
  if (!doctor) {
    return <div className="text-center py-10">Doctor data not found.</div>;
  }

  const initials = doctor.name
    ? doctor.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "DR";

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex justify-center md:justify-start">
              <Avatar className="h-32 w-32">
                {doctor.profilePhoto ? (
                  <AvatarImage
                    src={
                      typeof doctor.profilePhoto === "string"
                        ? doctor.profilePhoto
                        : undefined
                    }
                    alt={doctor.name || "Doctor"}
                  />
                ) : (
                  <AvatarFallback className="text-3xl">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {doctor.name || "Unknown Doctor"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {doctor.designation || "No designation"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfileContent;