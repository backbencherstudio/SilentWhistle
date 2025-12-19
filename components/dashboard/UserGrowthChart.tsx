/**
 * User Growth Chart Component
 * 
 * Displays a line chart showing user growth trends over time.
 * Features:
 * - Dual-line chart (Active vs Anonymous users)
 * - Monthly data points (Jan-Dec)
 * - Y-axis with K notation (0K-250K)
 * - Interactive tooltip on hover
 * - Responsive SVG-based visualization
 * 
 * @component
 * @example
 * <UserGrowthChart />
 */

'use client';

/**
 * User Growth Chart Component
 * 
 * Renders a line chart visualization of user growth data
 */
export default function UserGrowthChart() {
  // Month labels for X-axis
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Y-axis labels with K notation
  const yAxisLabels = ['250K', '200K', '150K', '100K', '50K', '25K', '0K'];
  
  // Sample data points for Active users (in thousands)
  const activeData = [180, 190, 200, 210, 220, 230, 240, 235, 240, 240, 240, 240];
  
  // Sample data points for Anonymous users (in thousands)
  const anonymousData = [60, 65, 70, 68, 72, 75, 70, 68, 65, 63, 63, 63];

  // Chart configuration constants
  const maxValue = 250; // Maximum value for Y-axis scaling
  const chartHeight = 300; // Chart height in pixels
  const chartWidth = 600; // Chart width in pixels

  /**
   * Calculates the Y position for a given value
   * Converts data value to SVG coordinate system
   * 
   * @param value - The data value to convert
   * @returns {number} The Y coordinate position
   */
  const getYPosition = (value: number) => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      {/* Chart Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Overview</h2>
        <p className="text-gray-400 text-sm">User Growth Trends</p>
      </div>

      <div className="relative">
        {/* Chart Title */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">User 240.8K</h3>
        </div>

        {/* Legend - Shows what each line represents */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
            <span className="text-white text-sm">Active: 18,234</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-white text-sm">Anonymous: 6,358</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative" style={{ height: chartHeight, width: '100%' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
            {/* Y-axis labels - Display scale values */}
            {yAxisLabels.map((label, index) => {
              const y = (index / (yAxisLabels.length - 1)) * chartHeight;
              return (
                <text
                  key={label}
                  x="10"
                  y={y + 5}
                  fill="#9ca3af"
                  fontSize="12"
                  textAnchor="start"
                >
                  {label}
                </text>
              );
            })}

            {/* Grid lines - Horizontal lines for better readability */}
            {yAxisLabels.map((_, index) => {
              const y = (index / (yAxisLabels.length - 1)) * chartHeight;
              return (
                <line
                  key={index}
                  x1="50"
                  y1={y}
                  x2={chartWidth - 50}
                  y2={y}
                  stroke="#1f2937"
                  strokeWidth="1"
                />
              );
            })}

            {/* Active users line (green) */}
            <polyline
              points={activeData.map((value, index) => {
                const x = 50 + (index / (months.length - 1)) * (chartWidth - 100);
                const y = getYPosition(value);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />

            {/* Anonymous users line (blue) */}
            <polyline
              points={anonymousData.map((value, index) => {
                const x = 50 + (index / (months.length - 1)) * (chartWidth - 100);
                const y = getYPosition(value);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
            />

            {/* Data points for Active users line */}
            {activeData.map((value, index) => {
              const x = 50 + (index / (months.length - 1)) * (chartWidth - 100);
              const y = getYPosition(value);
              return (
                <circle
                  key={`active-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#22c55e"
                />
              );
            })}

            {/* Data points for Anonymous users line */}
            {anonymousData.map((value, index) => {
              const x = 50 + (index / (months.length - 1)) * (chartWidth - 100);
              const y = getYPosition(value);
              return (
                <circle
                  key={`anonymous-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#60a5fa"
                />
              );
            })}

            {/* Tooltip area - Shows detailed info for June data point */}
            <g>
              <rect
                x={50 + (5 / (months.length - 1)) * (chartWidth - 100) - 60}
                y={getYPosition(230) - 40}
                width="120"
                height="35"
                fill="#1f2937"
                rx="4"
              />
              <text
                x={50 + (5 / (months.length - 1)) * (chartWidth - 100)}
                y={getYPosition(230) - 20}
                fill="#22c55e"
                fontSize="12"
                textAnchor="middle"
              >
                User 240.8K
              </text>
              <text
                x={50 + (5 / (months.length - 1)) * (chartWidth - 100)}
                y={getYPosition(230) - 5}
                fill="#ffffff"
                fontSize="12"
                textAnchor="middle"
              >
                June 21, 2025
              </text>
            </g>
          </svg>

          {/* X-axis labels - Month abbreviations */}
          <div className="flex justify-between mt-2 px-12">
            {months.map((month) => (
              <span key={month} className="text-xs text-gray-400">
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
