"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { id: 1, title: "Sign Up", description: "Quick email registration." },
  { id: 2, title: "Select Service", description: "Choose your perfect match." },
  { id: 3, title: "Provide Details", description: "Input necessary request data." },
  { id: 4, title: "Confirm Request", description: "Review and finalize selection." },
  { id: 5, title: "Expert Analysis", description: "Our pros find the solution." },
  { id: 6, title: "Receive Solution", description: "Get results delivered fast." },
  { id: 7, title: "Review Feedback", description: "Provide your valuable input." },
  { id: 8, title: "Complete Process", description: "Enjoy your finished results." },
];

export const EasySteps: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            How it <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest font-bold">
            8 Simple Steps to Success
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              {/* Flow Line (Connector) */}
              {/* Only shows on desktop/large screens for steps that aren't the last in the row */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-0">
                  <ChevronRight className="w-4 h-4 text-primary/30" />
                  <div className="absolute right-4 top-1/2 w-4 h-[1px] bg-border" />
                </div>
              )}

              <Card className="group relative overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl">
                {/* Slim Step Indicator Tab */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                
                <CardContent className="p-4 flex items-center gap-4">
                  {/* Small Circular ID */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {step.id}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground leading-none mb-1 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground/70 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Tiny Status Icon */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                </CardContent>
              </Card>

              {/* Vertical line for mobile flow */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual Road Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="px-6 py-2 rounded-full bg-secondary/50 border border-border text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
            End of Workflow
          </div>
        </div>
      </div>
    </section>
  );
};