import type { Group } from "@/types/task";
import {FiChevronDown, FiChevronRight} from 'react-icons/fi';
import TaskCard from "./TaskCard";
// Компонент группы задач
export function GroupItem({ group, toggleGroup }: { 
  group: Group; 
  toggleGroup: (id: number) => void 
}) {
  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
        onClick={() => toggleGroup(group.id)}
      >
        <div className="flex items-center">
          {group.isOpen ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
          <h3 className="font-semibold">{group.name}</h3>
        </div>
        <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
          {group.tasks.length}
        </span>
      </div>
      
      {group.isOpen && (
        <div className="mt-2 ml-4">
          {group.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}