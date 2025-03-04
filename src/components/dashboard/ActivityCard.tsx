
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

type Activity = {
  id: number;
  action: string;
  target: string;
  time: string;
};

type ActivityCardProps = {
  activities: Activity[];
};

const ActivityCard = ({ activities }: ActivityCardProps) => {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest website updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="rounded-full p-2 bg-gray-100">
                <Edit className="h-4 w-4 text-gray-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {activity.action}: <span className="text-muted-foreground">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
