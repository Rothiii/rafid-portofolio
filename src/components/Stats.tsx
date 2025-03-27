"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

const getCurrentYearDates = (offset: number = 0) => {
  const year = new Date().getFullYear();
  return {
    from: `${year - offset}-01-01T00:00:00Z`,
    to: `${year - offset}-12-31T23:59:59Z`,
  };
};

// Ganti dengan GitHub username kamu
const GITHUB_USERNAME = "rothiii";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

// Fetch data dari GitHub GraphQL API
const fetchGitHubStats = async () => {
  const { from, to } = getCurrentYearDates();
  const { from: lastYearFrom, to: lastYearTo } = getCurrentYearDates(1);

  const query = `
    {
      user(login: "${GITHUB_USERNAME}") {
        lastYearContributions: contributionsCollection(from: "${lastYearFrom}", to: "${lastYearTo}") {
          contributionCalendar {
            totalContributions
          }
        }
        thisYearContributions: contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await res.json();

    return {
      lastYearContributions:
        data.user.lastYearContributions.contributionCalendar.totalContributions,
      thisYearContributions:
        data.user.thisYearContributions.contributionCalendar.totalContributions,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { lastYearContributions: 0, thisYearContributions: 0 };
  }
};

const Stats = () => {
  const [gitHubStats, setGitHubStats] = useState({
    lastYearContributions: 0,
    thisYearContributions: 0,
  });

  useEffect(() => {
    fetchGitHubStats().then((data) => setGitHubStats(data));
  }, []);

  const stats = [
    { count: 2, text: "Years of experience" },
    { count: 3, text: "Projects completed" },
    {
      count: gitHubStats.lastYearContributions,
      text: `Contributions in ${new Date().getFullYear() - 1}`,
    },
    {
      count: gitHubStats.thisYearContributions,
      text: `Contributions in ${new Date().getFullYear()}`,
    },
  ];

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex gap-4 items-center justify-start"
            >
              <CountUp
                end={item.count}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p className="max-w-[150px] leading-snug text-white/80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
