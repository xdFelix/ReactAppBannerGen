// BannerTemplate.tsx
import React from 'react';

interface BannerTemplateProps {
  imageUrl: string;
  adText: string;
  ctaText: string;
  templateType: string;
  brandName: string;
  colors: {
    background: string;
    text: string;
    ctaButton: string;
  };
}

const BannerTemplate: React.FC<BannerTemplateProps> = ({
  imageUrl,
  adText,
  ctaText,
  templateType,
  brandName,
  colors,
}) => {
  return (
    <div style={{ backgroundColor: colors.background }}>
      <img src={imageUrl} alt="Generated Banner" />
      <p style={{ color: colors.text }}>{adText}</p>
      <button style={{ backgroundColor: colors.ctaButton }}>{ctaText}</button>
      {/* Add other template-specific elements based on templateType and brandName */}
    </div>
  );
};

export default BannerTemplate;