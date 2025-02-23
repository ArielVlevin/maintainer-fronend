import { FC } from "react";

interface MaintenanceStatusProps {
  title: string;
  taskName?: string;
  date?: Date | string;
  bgColor: string;
  textColor: string;
  noDataText: string;
}

const MaintenanceStatus: FC<MaintenanceStatusProps> = ({
  title,
  taskName,
  date,
  bgColor,
  textColor,
  noDataText,
}) => {
  return (
    <div className={`h-full w-[80px] lg:w-[200px]  p-2 rounded-md  ${bgColor}`}>
      <p className={`${textColor} font-medium mb-1`}>{title}</p>
      <div className="opacity-80">
        {taskName && date ? (
          <div className="p-2 rounded">
            <p className={`font-medium ${textColor}`}>{taskName}</p>
            <p className="text-xs text-gray-600">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-600">{noDataText}</p>
        )}
      </div>
    </div>
  );
};

export default MaintenanceStatus;
