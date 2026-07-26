"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { DashboardCards } from "@/components/admin/dashboard/StatCards";

export type AdminStats = {
  cards: DashboardCards;
  charts: {
    dailyLeads: { date: string; count: number }[];
    weeklyLeads: { week: string; count: number }[];
    monthlyLeads: { month: string; count: number }[];
    statusDistribution: { status: string; count: number }[];
    employmentType: { type: string; count: number }[];
    cities: { city: string; count: number }[];
    readinessDistribution: { range: string; count: number }[];
    loanAmountDistribution: { range: string; count: number }[];
    conversionFunnel: { stage: string; count: number }[];
  };
  analytics: {
    avgLoanAmount: number;
    avgReadinessScore: number;
    topEmployees: { name: string; totalAssigned: number; approved: number; conversionRate: number }[];
  };
};

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    axios
      .get("/api/admin/stats")
      .then((res) => {
        if (!cancelled) setStats(res.data);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load dashboard data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
