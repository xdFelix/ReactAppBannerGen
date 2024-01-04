// BannerTemplateSelector.tsx
import React from 'react';

interface BannerTemplateSelectorProps {
  onSelectTemplate: (templateType: string) => void;
}

const BannerTemplateSelector: React.FC<BannerTemplateSelectorProps> = ({ onSelectTemplate }) => {
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectTemplate(e.target.value);
  };

  return (
    <div>
      <label htmlFor="templateSelector">Select Template:</label>
      <select id="templateSelector" onChange={handleTemplateChange}>
        <option value="">Select Template</option>
        <option value="instagramPost">Instagram Post</option>
        <option value="twitterHeader">Twitter Header</option>
        <option value="story">Story</option>
      </select>
    </div>
  );
};

export default BannerTemplateSelector;