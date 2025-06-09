import { useState } from 'react';
import { Settings, Eye, Type, Volume2, X } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';
import { Button } from '@/components/ui/button';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, announce } = useAccessibility();

  const handleToggle = (setting: keyof typeof settings, value?: any) => {
    const newValue = value !== undefined ? value : !settings[setting];
    updateSettings({ [setting]: newValue });
    
    const messages = {
      highContrast: newValue ? 'High contrast enabled' : 'High contrast disabled',
      reducedMotion: newValue ? 'Reduced motion enabled' : 'Reduced motion disabled',
      announcements: newValue ? 'Screen reader announcements enabled' : 'Screen reader announcements disabled',
      fontSize: `Font size changed to ${newValue}`,
    };
    
    announce(messages[setting as keyof typeof messages] || 'Setting updated');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => {
          setIsOpen(true);
          announce('Accessibility menu opened');
        }}
        className="fixed bottom-20 right-4 z-[60] bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg border-2 border-white"
        aria-label="Open accessibility menu"
        title="Accessibility Options"
      >
        <Settings className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <div 
      className="fixed bottom-20 right-4 z-[60] bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-80"
      role="dialog"
      aria-labelledby="accessibility-menu-title"
      aria-modal="true"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="accessibility-menu-title" className="text-lg font-semibold text-gray-900 dark:text-white">
          Accessibility Options
        </h2>
        <Button
          onClick={() => {
            setIsOpen(false);
            announce('Accessibility menu closed');
          }}
          variant="ghost"
          size="sm"
          aria-label="Close accessibility menu"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              High Contrast
            </label>
          </div>
          <Button
            id="high-contrast"
            onClick={() => handleToggle('highContrast')}
            variant={settings.highContrast ? "default" : "outline"}
            size="sm"
            aria-pressed={settings.highContrast}
            aria-describedby="high-contrast-desc"
          >
            {settings.highContrast ? 'On' : 'Off'}
          </Button>
          <span id="high-contrast-desc" className="sr-only">
            Increases color contrast for better visibility
          </span>
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 text-gray-600 dark:text-gray-400">⚡</div>
            <label htmlFor="reduced-motion" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reduce Motion
            </label>
          </div>
          <Button
            id="reduced-motion"
            onClick={() => handleToggle('reducedMotion')}
            variant={settings.reducedMotion ? "default" : "outline"}
            size="sm"
            aria-pressed={settings.reducedMotion}
            aria-describedby="reduced-motion-desc"
          >
            {settings.reducedMotion ? 'On' : 'Off'}
          </Button>
          <span id="reduced-motion-desc" className="sr-only">
            Reduces animations and transitions
          </span>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</span>
          </div>
          <div className="flex space-x-1" role="radiogroup" aria-labelledby="font-size-label">
            <span id="font-size-label" className="sr-only">Choose font size</span>
            {(['normal', 'large', 'extra-large'] as const).map((size) => (
              <Button
                key={size}
                onClick={() => handleToggle('fontSize', size)}
                variant={settings.fontSize === size ? "default" : "outline"}
                size="sm"
                className="flex-1"
                role="radio"
                aria-checked={settings.fontSize === size}
                aria-describedby={`font-${size}-desc`}
              >
                {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
              </Button>
            ))}
          </div>
          <div className="sr-only">
            <span id="font-normal-desc">Normal font size</span>
            <span id="font-large-desc">Large font size</span>
            <span id="font-extra-large-desc">Extra large font size</span>
          </div>
        </div>

        {/* Announcements */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <label htmlFor="announcements" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Screen Reader Alerts
            </label>
          </div>
          <Button
            id="announcements"
            onClick={() => handleToggle('announcements')}
            variant={settings.announcements ? "default" : "outline"}
            size="sm"
            aria-pressed={settings.announcements}
            aria-describedby="announcements-desc"
          >
            {settings.announcements ? 'On' : 'Off'}
          </Button>
          <span id="announcements-desc" className="sr-only">
            Enables announcements for screen readers when content changes
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          These settings are saved automatically and will persist across visits.
        </p>
      </div>
    </div>
  );
}