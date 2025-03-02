'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white',
        font: {
          family: 'DM Sans',
        },
      },
    },
    title: {
      display: true,
      color: 'white',
      align: 'start',
      text: 'Gráfico dos ganhos e gastos do ano',
      font: {
        family: 'DM Sans',
        size: 14,
      },
    },
  },
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        color: 'white',
        font: {
          family: 'DM Sans',
        },
      },
    },
    x: {
      ticks: {
        color: 'white',
        font: {
          family: 'DM Sans',
        },
      },
    },
  },
}

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

type Props = {
  values: number[]
}
export function BarChart1({ values }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Soma do mês',
        data: values,
        backgroundColor: '#8d5abf',
      },
    ],
  }
  return <Bar options={options} data={data} width={100} height={500} />
}
