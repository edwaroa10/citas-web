import React from 'react';
import { ScreenType } from '../types';
import { LogIn, UserPlus, KeyRound, LayoutDashboard } from 'lucide-react';

interface TopBarNavigationProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const TopBarNavigation: React.FC<TopBarNavigationProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  return (
    <aside
      aria-label="Selector de Pantallas"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-md text-white p-1.5 rounded-2xl shadow-2xl border border-slate-700/60 flex items-center gap-1 max-w-[95vw] overflow-x-auto"
      id="screen-preview-switcher"
    >
      <span className="text-[11px] font-semibold text-slate-400 px-2.5 hidden sm:inline uppercase tracking-wider">
        Pantallas:
      </span>

      <button
        type="button"
        id="nav-screen-login"
        onClick={() => onSelectScreen('login')}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
          currentScreen === 'login'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Login</span>
      </button>

      <button
        type="button"
        id="nav-screen-register"
        onClick={() => onSelectScreen('register')}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
          currentScreen === 'register'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <UserPlus className="w-3.5 h-3.5" />
        <span>Registro</span>
      </button>

      <button
        type="button"
        id="nav-screen-forgot"
        onClick={() => onSelectScreen('forgot-password')}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
          currentScreen === 'forgot-password'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <KeyRound className="w-3.5 h-3.5" />
        <span>Recuperar Clave</span>
      </button>

      <button
        type="button"
        id="nav-screen-dashboard"
        onClick={() => onSelectScreen('dashboard')}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
          currentScreen === 'dashboard'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        <span>Portal de Citas</span>
      </button>
    </aside>
  );
};
