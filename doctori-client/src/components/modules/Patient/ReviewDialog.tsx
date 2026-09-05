"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createReview } from "@/services/patient/review.services";

interface ReviewDialogProps {
  appointmentId: string;
  doctorName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewDialog({
  appointmentId,
  doctorName,
  isOpen,
  onClose,
}: ReviewDialogProps) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    if (isSubmitting) return;

    setRating(0);
    setComment("");
    setErrorMessage("");
    onClose();
  };

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setErrorMessage("Please select a rating.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const result = await createReview({
      appointmentId,
      rating,
      comment: comment.trim() || undefined,
    });

    if (!result.success) {
      setErrorMessage(result.message);
      setIsSubmitting(false);
      return;
    }

    handleClose();
    router.refresh();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Review Dr. {doctorName}</DialogTitle>

          <DialogDescription>
            Rate your consultation experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Rating */}
          <div>
            <p className="text-sm font-medium mb-2">
              Rating
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setRating(value);
                    setErrorMessage("");
                  }}
                >
                  <Star
                    className={`h-7 w-7 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Comment
              <span className="text-muted-foreground font-normal">
                {" "}
                (Optional)
              </span>
            </label>

            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border rounded-md px-3 py-2 resize-none bg-background"
            />
          </div>

          {errorMessage && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}