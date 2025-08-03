import React from 'react';
import { Day } from '../types/types';
import { TaskCard } from './TaskCard';
import { VideoTaskCard } from './VideoTaskCard';
import { RadioTaskCard } from './RadioTaskCard';
import { ProfKhalidTaskCard } from './ProfKhalidTaskCard';

interface DayCardProps {
  day: Day;
  onTaskToggle: (dayId: string, taskId: string) => void;
  onSubtaskToggle: (dayId: string, taskId: string, subtaskIndex: number) => void;
  onVideoProgressUpdate: (dayId: string, taskId: string, field: string, value: string) => void;
  onRadioProgressUpdate: (dayId: string, taskId: string, field: string, value: string) => void;
  onProfKhalidProgressUpdate: (dayId: string, taskId: string, field: string, value: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  onTaskToggle,
  onSubtaskToggle,
  onVideoProgressUpdate,
  onRadioProgressUpdate,
  onProfKhalidProgressUpdate,
}) => {
  const completedTasks = day.tasks.filter(task => task.completed).length;
  const totalTasks = day.tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{day.name}</h3>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600">
            {completedTasks}/{totalTasks} tasks
          </div>
          <div className="text-sm font-semibold text-blue-600">
            {completionPercentage}%
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      <div className="space-y-4">
        {day.tasks.map((task) => {
          if (task.type === 'video') {
            return (
              <VideoTaskCard
                key={task.id}
                task={task}
                onToggle={() => onTaskToggle(day.id, task.id)}
                onSubtaskToggle={(subtaskIndex) => onSubtaskToggle(day.id, task.id, subtaskIndex)}
                onProgressUpdate={(field, value) => onVideoProgressUpdate(day.id, task.id, field, value)}
              />
            );
          } else if (task.type === 'radio') {
            return (
              <RadioTaskCard
                key={task.id}
                task={task}
                onToggle={() => onTaskToggle(day.id, task.id)}
                onSubtaskToggle={(subtaskIndex) => onSubtaskToggle(day.id, task.id, subtaskIndex)}
                onProgressUpdate={(field, value) => onRadioProgressUpdate(day.id, task.id, field, value)}
              />
            );
          } else if (task.type === 'profkhalid') {
            return (
              <ProfKhalidTaskCard
                key={task.id}
                task={task}
                onToggle={() => onTaskToggle(day.id, task.id)}
                onSubtaskToggle={(subtaskIndex) => onSubtaskToggle(day.id, task.id, subtaskIndex)}
                onProgressUpdate={(field, value) => onProfKhalidProgressUpdate(day.id, task.id, field, value)}
              />
            );
          } else {
            return (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => onTaskToggle(day.id, task.id)}
                onSubtaskToggle={(subtaskIndex) => onSubtaskToggle(day.id, task.id, subtaskIndex)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};