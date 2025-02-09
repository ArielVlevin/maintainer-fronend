"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  PenToolIcon as Tool,
  Clock,
  BarChart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden-element");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Streamline Your Product Maintenance
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                MaintenancePro helps you manage product upkeep, track issues,
                and optimize maintenance schedules all in one place.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/signin">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-100"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-blue-600 dark:text-blue-400">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Issue Tracking",
                content:
                  "Log and track maintenance issues with ease, ensuring nothing falls through the cracks.",
              },
              {
                icon: Clock,
                title: "Scheduled Maintenance",
                content:
                  "Set up recurring maintenance tasks to keep your products in top condition.",
              },
              {
                icon: BarChart,
                title: "Analytics Dashboard",
                content:
                  "Gain insights into maintenance patterns and product performance over time.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                      <feature.icon className="mr-2 h-5 w-5" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{feature.content}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="benefits"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-purple-600 dark:text-purple-400">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Increased Efficiency",
                content:
                  "Streamline your maintenance processes and reduce downtime with our intuitive app.",
              },
              {
                title: "Cost Savings",
                content:
                  "Prevent costly breakdowns and extend the life of your products with proactive maintenance.",
              },
              {
                title: "Improved Compliance",
                content:
                  "Stay on top of regulatory requirements with built-in compliance tracking and reporting.",
              },
              {
                title: "Better Decision Making",
                content:
                  "Make informed decisions based on comprehensive maintenance data and analytics.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg dark:bg-gray-800 dark:bg-opacity-50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {benefit.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="pricing"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-blue-600 dark:text-blue-400">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Free",
                price: "$0",
                features: [
                  "Basic issue tracking",
                  "Limited scheduled maintenance",
                  "Community support",
                ],
              },
              {
                title: "Pro",
                price: "$19.99/mo",
                features: [
                  "Advanced issue tracking",
                  "Unlimited scheduled maintenance",
                  "Analytics dashboard",
                  "Email support",
                ],
              },
              {
                title: "Enterprise",
                price: "Custom",
                features: [
                  "All Pro features",
                  "Custom integrations",
                  "Dedicated account manager",
                  "24/7 phone support",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="flex flex-col p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={
                    index === 1
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }
                >
                  {index === 2 ? "Contact Sales" : "Get Started"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 dark:bg-blue-800"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Optimize Your Product Maintenance?
              </h2>
              <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                Get in touch with us to learn how MaintenancePro can transform
                your maintenance processes.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
