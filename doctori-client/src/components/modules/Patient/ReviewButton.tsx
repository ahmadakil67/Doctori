"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewDialog from "./ReviewDialog";

interface Props {
  appointmentId: string;
  doctorName: string;
}

export default function ReviewButton({
  appointmentId,
  doctorName,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Write Review
      </Button>

      <ReviewDialog
        appointmentId={appointmentId}
        doctorName={doctorName}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}