import { NavSection } from "@/types/dashboard.interface";

import {
  getDefaultDashboardRoute,
  UserRole,
} from "./auth-utils";

/* =========================================================
   COMMON NAVIGATION
========================================================= */

export const getCommonNavItems = (
  role: UserRole
): NavSection[] => {
  const defaultDashboard =
    getDefaultDashboardRoute(role);

  const sections: NavSection[] = [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: [
            "PATIENT",
            "DOCTOR",
            "ADMIN",
          ],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: [
            "PATIENT",
            "DOCTOR",
            "ADMIN",
          ],
        },
      ],
    },
  ];

  /*
   * Preserving your existing access rule:
   * Change Password is currently shown to patients.
   */
  if (role === "PATIENT") {
    sections.push({
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
          roles: ["PATIENT"],
        },
      ],
    });
  }

  return sections;
};

/* =========================================================
   DOCTOR
========================================================= */

export const doctorNavItems: NavSection[] =
  [
    {
      title: "Patient Care",

      items: [
        {
          title: "Appointments",
          href: "/doctor/dashboard/appoinments",
          icon: "Calendar",
          roles: ["DOCTOR"],
        },

        {
          title: "My Schedules",
          href: "/doctor/dashboard/my-schedules",
          icon: "Clock",
          roles: ["DOCTOR"],
        },

        {
          title: "Prescriptions",
          href: "/doctor/dashboard/prescriptions",
          icon: "FileText",
          roles: ["DOCTOR"],
        },
      ],
    },
  ];

/* =========================================================
   PATIENT
========================================================= */

export const patientNavItems: NavSection[] =
  [
    {
      title: "Care",

      items: [
        {
          title: "My Appointments",
          href: "/dashboard/my-appointments",
          icon: "Calendar",
          roles: ["PATIENT"],
        },

        {
          title: "Find a Doctor",
          href: "/consultation",
          icon: "ClipboardList",
          roles: ["PATIENT"],
        },
      ],
    },

    {
      title: "Medical Records",

      items: [
        {
          title: "My Prescriptions",
          href: "/dashboard/my-prescriptions",
          icon: "FileText",
          roles: ["PATIENT"],
        },
      ],
    },
  ];

/* =========================================================
   ADMIN
========================================================= */

export const adminNavItems: NavSection[] =
  [
    {
      title: "User Management",

      items: [
        {
          title: "Admins",
          href: "/admin/dashboard/admins-management",
          icon: "Shield",
          roles: ["ADMIN"],
        },

        {
          title: "Doctors",
          href: "/admin/dashboard/doctors-management",
          icon: "Stethoscope",
          roles: ["ADMIN"],
        },

        {
          title: "Patients",
          href: "/admin/dashboard/patients-management",
          icon: "Users",
          roles: ["ADMIN"],
        },
      ],
    },

    {
      title: "Hospital Management",

      items: [
        {
          title: "Appointments",
          href: "/admin/dashboard/appointments-management",
          icon: "Calendar",
          roles: ["ADMIN"],
        },

        {
          title: "Schedules",
          href: "/admin/dashboard/schedules-management",
          icon: "Clock",
          roles: ["ADMIN"],
        },

        {
          title: "Specialities",
          href: "/admin/dashboard/specialities-management",
          icon: "Hospital",
          roles: ["ADMIN"],
        },
      ],
    },
  ];

/* =========================================================
   ROLE NAVIGATION
========================================================= */

export const getNavItemsByRole = (
  role: UserRole
): NavSection[] => {
  const commonNavItems =
    getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [
        ...commonNavItems,
        ...adminNavItems,
      ];

    case "DOCTOR":
      return [
        ...commonNavItems,
        ...doctorNavItems,
      ];

    case "PATIENT":
      return [
        ...commonNavItems,
        ...patientNavItems,
      ];

    default:
      return [];
  }
};