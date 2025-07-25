import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedScreens = ({ savedScreens, onLoadScreen, onDeleteScreen, onSaveNewScreen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenName, setScreenName] = useState('');
  const [screenDescription, setScreenDescription] = useState('');

  const handleSaveScreen = () => {
    if (screenName.trim()) {
      onSaveNewScreen({
        name: screenName,
        description: screenDescription,
        createdAt: new Date().toISOString()
      });
      setScreenName('');
      setScreenDescription('');
      setIsModalOpen(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Saved Screens</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Save Current
          </Button>
        </div>

        {savedScreens.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bookmark" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No saved screens yet</p>
            <p className="text-sm text-muted-foreground">Save your current filters to quickly access them later</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedScreens.map((screen) => (
              <div
                key={screen.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{screen.name}</div>
                  {screen.description && (
                    <div className="text-sm text-muted-foreground">{screen.description}</div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    Saved on {formatDate(screen.createdAt)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLoadScreen(screen)}
                    iconName="Play"
                    className="text-muted-foreground hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteScreen(screen.id)}
                    iconName="Trash2"
                    className="text-muted-foreground hover:text-error"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Screen Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Save Screen</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  iconName="X"
                />
              </div>

              <div className="space-y-4">
                <Input
                  label="Screen Name"
                  placeholder="Enter screen name"
                  value={screenName}
                  onChange={(e) => setScreenName(e.target.value)}
                  required
                />

                <Input
                  label="Description (Optional)"
                  placeholder="Brief description of this screen"
                  value={screenDescription}
                  onChange={(e) => setScreenDescription(e.target.value)}
                />

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSaveScreen}
                    disabled={!screenName.trim()}
                  >
                    Save Screen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SavedScreens;