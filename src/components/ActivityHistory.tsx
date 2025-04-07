import moment from 'moment';
import React from 'react';

interface Activity {
  id: number;
  date: string;
  type: string;
  description: string;
}

interface ActivityHistoryProps {
  activities: Activity[];
}

const ActivityHistory = ({ activities }: ActivityHistoryProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Activity History</h3>
      {activities.length > 0 ? (
        <ul className="list-disc list-inside">
          {activities.map((activity) => (
            <li key={activity.id} className="mb-4 md:mb-2">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <span className="text-gray-600 mr-2 mb-1 md:mb-0">
                  {moment(activity.date).format('MMM DD, YYYY')}
                </span>
                <div className="flex-1">
                  <span className="font-semibold block mb-1">
                    {activity.type}
                  </span>
                  <span className="text-sm">{activity.description}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activity history to display.</p>
      )}
    </div>
  );
};

export default ActivityHistory;
