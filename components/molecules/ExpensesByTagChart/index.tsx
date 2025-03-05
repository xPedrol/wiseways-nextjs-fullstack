'use client'
import { getDayjs } from '@/utils/date'
import { formatMoney } from '@/utils/string'
import { faker } from '@faker-js/faker'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

type Props = {
  values: number[]
  labels: string[] // Adicione labels para o Treemap
}

export const ExpensesByTagChart = ({ values, labels }: Props) => {
  // Configurações do gráfico
  const options = {
    chart: {
      id: 'treemap-chart',
      fontFamily: 'DM Sans', // Altera a fonte do gráfico
      toolbar: {
        show: false, // Oculta a barra de ferramentas
      },
    },
    plotOptions: {
      treemap: {
        enableShades: true, // Habilita tons de cores
        shadeIntensity: 0.5, // Intensidade dos tons
        distributed: true, // Distribui as cores (cada bloco terá uma cor única)
        colorScale: {
          ranges: [], // Remova a escala de cores fixa
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '13px', // Tamanho da fonte dos rótulos
        colors: ['#FFFFFF'], // Cor do texto dos rótulos
        fontFamily: 'DM Sans', // Fonte dos rótulos
      },
      formatter: (text: string) => {
        return `${text}` // Exibe apenas o rótulo
      },
    },
    title: {
      text: `Ganhos e Despesas de ${getDayjs().year()}`,
      align: 'left',
      style: {
        color: '#FFFFFF', // Cor branca para o título
        fontSize: '16px',
        fontFamily: 'DM Sans', // Fonte do título
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: 'DM Sans', // Fonte do tooltip
        fontSize: '16px',
      },
      theme: 'dark', // Tema do tooltip (dark para fundo escuro)
      y: {
        formatter: (value: number) => formatMoney(value), // Formata o valor do tooltip
      },
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: number[][]
        seriesIndex: number
        dataPointIndex: number
        w: {
          globals: {
            labels: string[]
          }
        }
      }) => {
        return `<div class="custom-tooltip" style="background: #3f3f3f; color: #FFFFFF; padding: 8px; border-radius: 4px;">
                <strong>${labels[dataPointIndex]}</strong>: ${formatMoney(
          series[seriesIndex][dataPointIndex],
        )}
              </div>`
      },
    },
    colors: values.map(() => {
      return faker.color.rgb()
    }), // Lista de cores para cada bloco
  } satisfies ApexOptions

  // Dados do gráfico
  const series = [
    {
      data: labels.map((label, index) => ({
        x: label,
        y: values[index],
      })),
    },
  ]

  return <Chart options={options} series={series} type="treemap" height={450} />
}
