import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Star } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

interface Props {
  reviews: Review[];
}

export default function DoctorReviews({
  reviews,
}: Props) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Reviews</CardTitle>
      </CardHeader>

      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

              <span className="font-semibold">
                {averageRating.toFixed(1)}
              </span>

              <span className="text-sm text-muted-foreground">
                ({reviews.length} review
                {reviews.length !== 1 ? "s" : ""})
              </span>
            </div>

            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-t pt-4"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`h-4 w-4 ${
                        value <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {review.comment && (
                  <p className="text-sm">
                    {review.comment}
                  </p>
                )}

                <p className="text-xs text-muted-foreground mt-2">
                  {format(
                    new Date(review.createdAt),
                    "MMM d, yyyy"
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}