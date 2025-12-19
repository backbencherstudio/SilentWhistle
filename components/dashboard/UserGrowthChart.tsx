/**
 * User Growth Chart Component
 * 
 * Displays a line chart showing user growth trends over time using ApexCharts.
 * Features:
 * - Dual-line chart (Active vs Anonymous users)
 * - Monthly data points (Jan-Dec)
 * - Y-axis with K notation (0K-250K)
 * - Interactive tooltip on hover
 * - Time filter buttons (This Year, Monthly, Weekly)
 * - Responsive ApexCharts visualization
 * 
 * @component
 * @example
 * <UserGrowthChart />
 */

'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { TrendingUpIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Helper function to format date for year period
const formatDate = (monthIndex: number) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[monthIndex]} 21, 2025`;
};

/**
 * User Growth Chart Component
 * 
 * Renders a line chart visualization of user growth data using ApexCharts
 */
export default function UserGrowthChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<'year' | 'month' | 'week'>('year');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    value: string;
    date: string;
    left: number;
    top: number;
  }>({
    value: '241K',
    date: 'June 21, 2025',
    left: 37.42,
    top: 30,
  });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Helper function to calculate Y position of green line center based on values
  const calculateGreenLineCenterY = (activeValue: number, anonymousValue: number) => {
    // Chart configuration
    const chartHeight = 394;
    const plotAreaTop = 20;
    const plotAreaBottom = 30;
    const plotAreaHeight = chartHeight - plotAreaTop - plotAreaBottom;
    const yAxisMin = 0;
    const yAxisMax = 250;
    
    // Green line center is at: anonymousValue + (activeValue / 2)
    // This represents the middle of the green area (stacked on top of blue)
    const greenLineCenterValue = anonymousValue + (activeValue / 2);
    
    // Calculate normalized position (inverted because Y=0 is at top in charts)
    const normalizedPosition = (yAxisMax - greenLineCenterValue) / (yAxisMax - yAxisMin);
    
    // Calculate Y position in plot area
    const yInPlotArea = normalizedPosition * plotAreaHeight;
    
    // Return absolute Y position (from top of chart container)
    return plotAreaTop + yInPlotArea;
  };
  
  // Data for different periods
  const yearData = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    active: [180, 190, 200, 210, 220, 230, 240, 235, 240, 240, 240, 240],
    anonymous: [60, 65, 70, 68, 72, 75, 70, 68, 65, 63, 63, 63],
  };

  const monthData = {
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
    active: [235, 238, 240, 240],
    anonymous: [65, 64, 63, 63],
  };

  const weekData = {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    active: [238, 239, 240, 240, 240, 240, 240],
    anonymous: [64, 63, 63, 63, 63, 63, 63],
  };

  // Get current data based on selected period
  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'month':
        return monthData;
      case 'week':
        return weekData;
      default:
        return yearData;
    }
  };

  const currentData = getCurrentData();
  const activeData = currentData.active;
  const anonymousData = currentData.anonymous;
  const xAxisCategories = 'months' in currentData ? currentData.months : 'weeks' in currentData ? currentData.weeks : currentData.days;

  // Helper function to format date based on period
  const formatDateByPeriod = (index: number) => {
    if (selectedPeriod === 'year') {
      return formatDate(index);
    } else if (selectedPeriod === 'month') {
      const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4"];
      return `${weekNames[index]} of December 2025`;
    } else {
      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return `${dayNames[index]} December 21, 2025`;
    }
  };

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      type: 'area' as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      offsetX: 0,
      offsetY: 0,
      events: {
        dataPointMouseEnter: (_event: unknown, _chartContext: unknown, config: { dataPointIndex?: number; seriesIndex?: number; x?: number }) => {
          const dataPointIndex = config.dataPointIndex;
          const seriesIndex = config.seriesIndex;
          const xPosition = config.x;
          
          // Get the value from the active series (seriesIndex 0)
          if (seriesIndex === 0 && dataPointIndex !== undefined && dataPointIndex >= 0 && dataPointIndex < activeData.length) {
            const value = activeData[dataPointIndex];
            const anonymousValue = anonymousData[dataPointIndex];
            const date = formatDateByPeriod(dataPointIndex);
            
              // Use ApexCharts' x position for accurate positioning within plot area
              // xPosition is relative to the plot area, not the container
              if (xPosition !== undefined && chartContainerRef.current) {
                const rect = chartContainerRef.current.getBoundingClientRect();
                // ApexCharts plot area typically has ~50px left padding and ~60px right padding (for December gap)
                const plotAreaLeft = 50;
                const absoluteX = plotAreaLeft + xPosition;
                const leftPercentage = (absoluteX / rect.width) * 100;
              
              // Calculate top position at the center of green line
              const greenLineCenterY = calculateGreenLineCenterY(value, anonymousValue);
              const topPercentage = (greenLineCenterY / 394) * 100;
              
            setTooltipData({
              value: `${Math.round(value)}K`,
              date: date,
              left: Math.max(5, Math.min(95, leftPercentage)),
              top: Math.max(5, Math.min(85, topPercentage - 8)),
            });
            } else {
              // Fallback calculation - ensure January (index 0) is positioned correctly
              const plotAreaLeft = 50;
              const plotAreaRight = 60; // Increased for December gap
              if (chartContainerRef.current) {
                const rect = chartContainerRef.current.getBoundingClientRect();
                const plotAreaWidth = rect.width - plotAreaLeft - plotAreaRight;
                const lastIndex = xAxisCategories.length - 1;
                const dataPointX = plotAreaLeft + (dataPointIndex / lastIndex) * plotAreaWidth;
                const leftPercentage = (dataPointX / rect.width) * 100;
                
                // Calculate top position at the center of green line
                const greenLineCenterY = calculateGreenLineCenterY(value, anonymousData[dataPointIndex]);
                const topPercentage = (greenLineCenterY / 394) * 100;
                
            setTooltipData({
              value: `${Math.round(value)}K`,
              date: date,
              left: Math.max(5, Math.min(95, leftPercentage)),
              top: Math.max(5, Math.min(85, topPercentage - 8)),
            });
              } else {
                const leftPercentage = (dataPointIndex / (xAxisCategories.length - 1)) * 100;
                
                // Calculate top position at the center of green line
                const greenLineCenterY = calculateGreenLineCenterY(value, anonymousData[dataPointIndex]);
                const topPercentage = (greenLineCenterY / 394) * 100;
                
                setTooltipData({
                  value: `${Math.round(value)}K`,
                  date: date,
                  left: leftPercentage,
                  top: Math.max(5, Math.min(85, topPercentage - 8)),
                });
              }
            }
            setTooltipVisible(true);
          }
        },
        dataPointMouseLeave: () => {
          // Keep tooltip visible when moving between data points
        },
        mouseMove: (_event: unknown, _chartContext: unknown, config: { dataPointIndex?: number; seriesIndex?: number; x?: number }) => {
          // Handle mouse move for smoother tooltip following
          if (config && config.dataPointIndex !== undefined && config.seriesIndex === 0) {
            const dataPointIndex = config.dataPointIndex;
            const xPosition = config.x;
            
            if (dataPointIndex >= 0 && dataPointIndex < activeData.length) {
              const value = activeData[dataPointIndex];
              const anonymousValue = anonymousData[dataPointIndex];
              const date = formatDateByPeriod(dataPointIndex);
              
              // Use ApexCharts' x position for accurate positioning
              if (xPosition !== undefined && chartContainerRef.current) {
                const rect = chartContainerRef.current.getBoundingClientRect();
                const plotAreaLeft = 50; // Increased right padding for December gap
                const absoluteX = plotAreaLeft + xPosition;
                const leftPercentage = (absoluteX / rect.width) * 100;
                
                // Calculate top position at the center of green line
                const greenLineCenterY = calculateGreenLineCenterY(value, anonymousValue);
                const topPercentage = (greenLineCenterY / 394) * 100;
                
            setTooltipData({
              value: `${Math.round(value)}K`,
              date: date,
              left: Math.max(5, Math.min(95, leftPercentage)),
              top: Math.max(5, Math.min(85, topPercentage - 8)),
            });
              } else {
                // Fallback calculation
                const leftPercentage = (dataPointIndex / (xAxisCategories.length - 1)) * 100;
                
                // Calculate top position at the center of green line
                const greenLineCenterY = calculateGreenLineCenterY(value, anonymousValue);
                const topPercentage = (greenLineCenterY / 394) * 100;
                
                setTooltipData({
                  value: `${Math.round(value)}K`,
                  date: date,
                  left: leftPercentage,
                  top: Math.max(5, Math.min(85, topPercentage - 8)),
                });
              }
              setTooltipVisible(true);
            }
          }
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    colors: ['#38e07b', '#7485ff'], // Green for Active, Blue for Anonymous
    xaxis: {
      categories: xAxisCategories,
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
    },
    plotOptions: {
      area: {
        fillTo: 'end' as const,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return `${Math.round(value)}K`;
        },
        style: {
          colors: '#9ca3af',
          fontSize: '12px',
        },
      },
      min: 0,
      max: 250,
      tickAmount: 7,
    },
    grid: {
      borderColor: '#1f2937',
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
          strokeDashArray: 0,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: 'Active',
      data: activeData,
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
    },
    {
      name: 'Anonymous',
      data: anonymousData,
      fill: {
        opacity: 0,
      },
    },
  ];

  // Update chart options when period changes
  const chartOptionsWithPeriod = {
    ...chartOptions,
    xaxis: {
      ...chartOptions.xaxis,
      categories: xAxisCategories,
    },
  };

  return (
    <Card className="bg-[#101012] rounded-2xl border-0 h-full">
      <CardContent className="p-8">
      {/* Chart Header */}
      <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
        <h2 className="text-xl font-bold text-white mb-1">Overview</h2>
        <p className="text-gray-400 text-sm">User Growth Trends</p>
      </div>

            {/* Time Filter Buttons */}
            <div className="w-[380px] h-12 relative bg-neutral-900 rounded-xl overflow-hidden">
              <div className="left-[8px] top-[8.50px] right-[8px] absolute inline-flex justify-between items-center">
                <button
                  onClick={() => setSelectedPeriod('year')}
                  className={`w-28 px-3 py-2 rounded-md flex justify-center items-center gap-1 transition-all duration-200 ${
                    selectedPeriod === 'year'
                      ? 'bg-zinc-800 shadow-sm'
                      : 'hover:opacity-80'
                  }`}
                >
                  <div className={`justify-start text-sm font-['Inter'] leading-4 ${
                    selectedPeriod === 'year'
                      ? 'text-green-400 font-normal'
                      : 'text-neutral-300 font-light'
                  }`}>
                    This Year
                  </div>
                </button>
                <button
                  onClick={() => setSelectedPeriod('month')}
                  className={`w-28 px-3 py-2 rounded-md flex justify-center items-center gap-1 transition-all duration-200 ${
                    selectedPeriod === 'month'
                      ? 'bg-zinc-800 shadow-sm'
                      : 'hover:opacity-80'
                  }`}
                >
                  <div className={`justify-start text-sm font-['Inter'] leading-4 ${
                    selectedPeriod === 'month'
                      ? 'text-green-400 font-normal'
                      : 'text-neutral-300 font-light'
                  }`}>
                    Monthly
                  </div>
                </button>
                <button
                  onClick={() => setSelectedPeriod('week')}
                  className={`w-28 px-3 py-2 rounded-md flex justify-center items-center gap-1 transition-all duration-200 ${
                    selectedPeriod === 'week'
                      ? 'bg-zinc-800 shadow-sm'
                      : 'hover:opacity-80'
                  }`}
                >
                  <div className={`justify-start text-sm font-['Inter'] leading-4 ${
                    selectedPeriod === 'week'
                      ? 'text-green-400 font-normal'
                      : 'text-neutral-300 font-light'
                  }`}>
                    Weekly
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* User Title and Legend Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="font-['Inter',Helvetica] font-normal text-gray-400 text-lg tracking-[0] leading-[19.8px]">
                User
              </div>
              <div className="font-['Inter',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[38.4px]">
                240.8K
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
          <div className="flex items-center gap-2">
                <div className="w-[7px] h-[7px] bg-[#38e07b] rounded-full" />
                <div className="font-['Inter',Helvetica] font-light text-gray-400 text-sm tracking-[0] leading-[15.4px]">
                  Active: 18,234
                </div>
          </div>
          <div className="flex items-center gap-2">
                <div className="w-[7px] h-[7px] bg-[#7485ff] rounded-full" />
                <div className="font-['Inter',Helvetica] font-light text-gray-400 text-sm tracking-[0] leading-[15.4px]">
                  Anonymous: 6,358
                </div>
              </div>
          </div>
        </div>

          {/* Chart Container with Tooltip Card Inside */}
          <div className="relative">
        {/* Chart Container */}
            <div 
              ref={chartContainerRef}
              className="relative" 
              style={{ minHeight: '394px', width: '100%' }}
              onMouseLeave={() => setTooltipVisible(false)}
              onMouseMove={(e) => {
                // Fallback: Calculate which data point we're closest to based on mouse position
                // This handles cases where ApexCharts events don't fire
                if (chartContainerRef.current) {
                  const rect = chartContainerRef.current.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const mouseY = e.clientY - rect.top;
                  
                  // Account for chart padding (ApexCharts typically uses ~50px left, increased right padding for December gap)
                  const plotAreaLeft = 50;
                  const plotAreaRight = 60; // Increased right padding to create gap after December
                  const plotAreaTop = 20;
                  const plotAreaBottom = 30;
                  const plotAreaWidth = rect.width - plotAreaLeft - plotAreaRight;
                  
                  // Expand detection area to include buffer zones for edge data points (January and December)
                  // Allow detection in the left padding area (0 to plotAreaLeft) to trigger January
                  // Allow detection in the right padding area to trigger December
                  const detectionLeft = 0; // Start from very left
                  const detectionRight = rect.width; // Extend to very right to catch December
                  
                  // Check if mouse is within expanded detection area
                  if (mouseX >= detectionLeft && mouseX <= detectionRight && 
                      mouseY >= plotAreaTop && mouseY <= rect.height - plotAreaBottom) {
                    // Special handling for left edge (January - index 0)
                    let dataPointIndex: number;
                    const lastIndex = xAxisCategories.length - 1;
                    const plotAreaRightEdge = rect.width - plotAreaRight;
                    
                    if (mouseX < plotAreaLeft) {
                      // Mouse is in left padding area, treat as January (index 0)
                      dataPointIndex = 0;
                    } else if (mouseX > plotAreaRightEdge) {
                      // Mouse is in right padding area, treat as December (last index)
                      dataPointIndex = lastIndex;
                    } else {
                      // Calculate relative position within plot area
                      const relativeX = mouseX - plotAreaLeft;
                      const relativePercentage = relativeX / plotAreaWidth;
                      
                      // Calculate data point index
                      // Each data point occupies 1/(n-1) of the plot width
                      // Use round for better accuracy, but ensure we're within bounds
                      dataPointIndex = Math.round(relativePercentage * lastIndex);
                      // Clamp to valid range
                      dataPointIndex = Math.max(0, Math.min(lastIndex, dataPointIndex));
                    }
                    
                    if (dataPointIndex >= 0 && dataPointIndex < activeData.length) {
                      const value = activeData[dataPointIndex];
                      const anonymousValue = anonymousData[dataPointIndex];
                      const date = formatDateByPeriod(dataPointIndex);
                      
                      // Calculate exact position for tooltip at the data point
                      // Data points are evenly spaced: index 0 at left edge, last index before right padding
                      const lastIndex = xAxisCategories.length - 1;
                      const dataPointX = plotAreaLeft + (dataPointIndex / lastIndex) * plotAreaWidth;
                      const leftPercentage = (dataPointX / rect.width) * 100;
                      
                      // Calculate top position at the center of green line
                      const greenLineCenterY = calculateGreenLineCenterY(value, anonymousValue);
                      const topPercentage = (greenLineCenterY / rect.height) * 100;
                      
            setTooltipData({
              value: `${Math.round(value)}K`,
              date: date,
              left: Math.max(5, Math.min(95, leftPercentage)),
              top: Math.max(5, Math.min(85, topPercentage - 8)),
            });
                      setTooltipVisible(true);
                    }
                  }
                }
              }}
            >
              <Chart
                key={selectedPeriod}
                options={chartOptionsWithPeriod}
                series={chartSeries}
                type="area"
                height={394}
              />
              
              {/* Tooltip Card - Positioned inside chart based on mouse hover */}
              {tooltipVisible && (
                <div
                  className="absolute z-10 transition-all duration-100 pointer-events-none"
                  style={{
                    left: `${tooltipData.left}%`,
                    top: `${tooltipData.top}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <Card className="w-[145px] bg-[#14151c] rounded-lg border-[0.6px] border-[#0b1739] shadow-[3px_4px_17px_#01051133]">
                    <CardContent className="p-3.5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="font-['Inter',Helvetica] font-normal text-white text-xs tracking-[0] leading-[13.2px]">
                            User
                          </div>
                          <Badge className="bg-[#0a160d] border-[0.6px] border-[#05c16833] rounded-sm px-1 py-0.5 hover:bg-[#0a160d]">
                            <div className="flex items-center gap-0.5">
                              <span className="font-['Inter',Helvetica] font-normal text-[#38e07b] text-xs tracking-[0] leading-[13.2px]">
                                {tooltipData.value}
              </span>
                              <TrendingUpIcon className="w-2 h-2 text-[#38e07b]" />
                            </div>
                          </Badge>
                        </div>
                        <div className="font-['Inter',Helvetica] font-normal text-gray-400 text-xs tracking-[0] leading-[13.2px]">
                          {tooltipData.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
