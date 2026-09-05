import { IDoctorSchedule } from "./schedule.interface";

export interface IDoctor {
  id?: string;

  name: string;
  email: string;
  password: string;

  contactNumber: string;
  address?: string;

  registrationNumber: string;
  experience?: number;

  gender: "MALE" | "FEMALE";

  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;

  specialties?: string[];

  profilePhoto?: File | string;

  removeSpecialties?: string[];

  isDeleted?: boolean;

  averageRating?: number;

  createdAt?: string;
  updatedAt?: string;

  // Doctor specialties from backend
  doctorSpecialties?: Array<{
    specialitiesId: string;
    doctorId?: string;

    specialities?: {
      id: string;
      title: string;
      icon?: string;
    };
  }>;

  // Doctor schedules
  doctorSchedules?: IDoctorSchedule[];

  // Doctor reviews
  reviews?: Array<{
    id: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
  }>;
}