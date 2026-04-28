import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Award } from 'lucide-react';
import { DepartmentCount } from '../api';

interface AnalyticsDashboardProps {
  averageMarks: number;
  departmentCounts: DepartmentCount;
  totalStudents: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  averageMarks,
  departmentCounts,
  totalStudents,
}) => {
  const chartData: { name: string; count: number }[] = Object.entries(departmentCounts).map(([name, count]) => ({
    name,
    count: Number(count),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Stats Cards */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Average Score</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-mono font-bold text-gray-900">{averageMarks.toFixed(1)}</div>
          <div className="text-xs text-gray-400 mt-1">Across all departments</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Total Students</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-mono font-bold text-gray-900">{totalStudents}</div>
          <div className="text-xs text-gray-400 mt-1">Active enrollments</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Top Dept</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-xl font-semibold text-gray-900 truncate">
            {chartData.sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
          </div>
          <div className="text-xs text-gray-400 mt-1">Highest enrollment</div>
        </div>
      </div>

      {/* Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif mb-6">Department Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9ca3af' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9ca3af' }}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
