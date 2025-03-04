
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real app, this would come from an API
const data = [
  { name: "Blog", pageviews: 4000, timeOnPage: 2400 },
  { name: "Home", pageviews: 3000, timeOnPage: 1398 },
  { name: "Services", pageviews: 2000, timeOnPage: 9800 },
  { name: "About", pageviews: 2780, timeOnPage: 3908 },
  { name: "Contact", pageviews: 1890, timeOnPage: 4800 },
];

const EngagementChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ background: '#fff', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <Legend />
              <Bar dataKey="pageviews" name="Page Views" fill="#8884d8" />
              <Bar dataKey="timeOnPage" name="Time (sec)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
