/**
 * CO2LineChart - Gráfica de línea para emisiones de CO2
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CO2LineChartProps {
  data: Array<{ date: string; co2: number }>;
}

export default function CO2LineChart({ data }: CO2LineChartProps) {
  return (
    <div className="w-full" style={{ minHeight: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              color: '#111827',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="co2" 
            stroke="#00c853" 
            strokeWidth={2}
            dot={{ fill: '#00c853' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
