/**
 * TabNavigation - Navegación entre pestañas de Social
 */
import { Trophy, Award, Users } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  Icon: any;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'leaderboard', label: 'Ranking', Icon: Trophy },
  { id: 'achievements', label: 'Logros', Icon: Award },
  { id: 'friends', label: 'Amigos', Icon: Users },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm border border-gray-200">
      {tabs.map((tab) => {
        const IconComponent = tab.Icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md
              font-medium transition-all duration-200
              ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            <IconComponent className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
