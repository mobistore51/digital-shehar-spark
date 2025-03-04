
import React from "react";
import TrafficChart from "./charts/TrafficChart";
import EngagementChart from "./charts/EngagementChart";
import ConversionChart from "./charts/ConversionChart";

const AnalyticsSection = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold">Analytics Overview</h3>
        <p className="text-muted-foreground">Performance metrics for your website</p>
      </div>
      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <TrafficChart />
      </div>
      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <EngagementChart />
        <ConversionChart />
      </div>
    </div>
  );
};

export default AnalyticsSection;
