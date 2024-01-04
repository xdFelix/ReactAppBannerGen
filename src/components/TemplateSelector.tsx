// TemplateSelector.tsx
import React, { useState } from 'react';

interface TemplateSelectorProps {
  onSelectTemplate: (templateType: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSelectTemplate = (templateType: string) => {
    setSelectedTemplate(templateType);
    onSelectTemplate(templateType);
  };

  return (
    <div>
      <h3>Select a Template</h3>
      <button onClick={() => handleSelectTemplate('instagram')}>Instagram Post</button>
      <button onClick={() => handleSelectTemplate('twitter')}>Twitter Header</button>
      <button onClick={() => handleSelectTemplate('story')}>Story</button>
      <p>Selected Template: {selectedTemplate}</p>
    </div>
  );
};

export default TemplateSelector;
