import HomeChartSection from "@/components/molecules/HomeChartSection";
import cfetch from "@/config/fetchapi";
import { ExpenseByTag } from "@/types/expense";
import { getCookie } from "@/utils/cookie";
import { getDayjs } from "@/utils/date";
import { formatMoney, getMoneyColor } from "@/utils/string";
import { BarChart, TrendingDown, TrendingUp } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/auth";
export const metadata: Metadata = {
  title: "Início",
};
const cardStyle =
  "flex-1 bg-surface-a10 px-4 py-2 rounded-lg flex flex-col min-w-[300px]";
export default async function Home() {
  const date = getDayjs();
  const start = date.startOf("year").utc().format();
  const end = date.endOf("year").utc().format();
  const session = await auth();
  const savedHeaders = new Headers(await headers());
  if (session && session.jwt) {
    savedHeaders.set("Authorization", `Bearer ${session.jwt}`);
  }
  const summaryResponse = await cfetch(
    `/expenses/summary?start=${start}&end=${end}`,
    {
      method: "GET",
      headers: savedHeaders,
    }
  );
  const summary = {
    gain: 0,
    loss: 0,
    total: 0,
  };
  if (summaryResponse.status === 200) {
    Object.assign(summary, await summaryResponse.json());
  }

  const chartType = (await getCookie("chartType")) ?? "sum";
  let sumByMonths = [];
  let sumByTags: ExpenseByTag[] = [];
  if (chartType === "sum") {
    const sumByMonthsResponse = await cfetch(
      `/expenses/sum-months?start=${start}&end=${end}`,
      {
        method: "GET",
        headers: savedHeaders,
      }
    );

    if (sumByMonthsResponse.status === 200) {
      sumByMonths = await sumByMonthsResponse.json();
    }
  } else {
    const sumByTagsResponse = await cfetch(
      `/expenses/sum-tags?start=${start}&end=${end}`,
      {
        method: "GET",
        headers: savedHeaders,
      }
    );

    if (sumByTagsResponse.status === 200) {
      sumByTags = await sumByTagsResponse.json();
    }
  }
  return (
    <div className="custom-contaier mt-10">
      <div className="flex content-between flex-wrap gap-4 mb-10">
        <div className={cardStyle}>
          <TrendingUp size={32} stroke="#ab82d0" />
          <h1>Ganhos</h1>
          <p className={`font-bold text-2xl`}>{formatMoney(summary.gain)}</p>
        </div>
        <div className={cardStyle}>
          <TrendingDown size={32} stroke="#ab82d0" />
          <h1>Despesas</h1>
          <p className={`font-bold text-2xl`}>{formatMoney(summary.loss)}</p>
        </div>
        <div className={cardStyle}>
          <BarChart size={32} stroke="#ab82d0" />
          <h1>Total</h1>
          <p className={`font-bold text-2xl ${getMoneyColor(summary.total)}`}>
            {formatMoney(summary.total)}
          </p>
        </div>
      </div>
      <HomeChartSection sumByTags={sumByTags} sumByMonths={sumByMonths} />
    </div>
  );
}
