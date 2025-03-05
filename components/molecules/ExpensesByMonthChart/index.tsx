'use client'
import { getDayjs } from '@/utils/date'
import { formatMoney } from '@/utils/string'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
type Props = {
  values: number[]
}
export const ExpensesByMonthChart = ({ values }: Props) => {
  // Configurações do gráfico
  const options = {
    chart: {
      id: 'vertical-bar-chart',
      fontFamily: 'DM Sans', // Altera a fonte do gráfico
      toolbar: {
        show: false, // Oculta a barra de ferramentas
      },
    },
    xaxis: {
      categories: [
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
      ],
      labels: {
        style: {
          colors: '#FFFFFF', // Cor branca para as legendas do eixo X
          fontSize: '13px', // Tamanho da fonte das legendas do eixo X
        },
      },
      axisBorder: {
        show: false, // Remove a borda do eixo X
      },
      axisTicks: {
        show: false, // Remove os ticks do eixo X
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF', // Cor branca para as legendas do eixo Y
          fontSize: '13px', // Tamanho da fonte das legendas do eixo Y
        },
        formatter: (value: number) => {
          if (value === 0) return '0'
          return formatMoney(value, true)
        }, // Aplica a máscara aos valores do eixo Y
      },
    },
    grid: {
      show: false, // Remove as grades do gráfico
    },
    plotOptions: {
      bar: {
        horizontal: false, // Define o gráfico como vertical
        dataLabels: {
          position: 'top', // Posiciona os valores no topo da barra
        },
      },
    },
    dataLabels: {
      formatter: (val: number) => {
        // Exibe o rótulo apenas se o valor for maior que zero
        return val !== 0 ? formatMoney(val, true) : ''
      },
      style: {
        fontSize: '10px', // Tamanho da fonte dos rótulos de dados
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
    colors: ['#7e46b7'], // Cor das barras
    tooltip: {
      enabled: true,
      style: {
        fontFamily: 'DM Sans', // Fonte do tooltip
        fontSize: '16px',
      },
      cssClass: 'custom-tooltip', // Adiciona uma classe personalizada ao tooltip
      theme: 'dark', // Tema do tooltip (dark para fundo escuro)
      y: {
        formatter: (value: number) => formatMoney(value), // Aplica a máscara aos valores do tooltip
      },
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
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
                <strong>${
                  w.globals.labels[dataPointIndex]
                }</strong>: ${formatMoney(series[seriesIndex][dataPointIndex])}
              </div>`
      },
    },
  } satisfies ApexOptions

  // Dados do gráfico
  const series = [
    {
      name: 'Despesas',
      data: values,
    },
  ]

  return <Chart options={options} series={series} type="bar" height={450} />
}
