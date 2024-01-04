import React, { useState } from 'react';
import BannerTemplate from './BannerTemplate';
import TemplateSelector from './TemplateSelector';
import axios from 'axios';

const BannerGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [brandNameInput, setBrandNameInput] = useState('');
  const [selectedColors, setSelectedColors] = useState({
    background: '#ffffff',
    text: '#000000',
    ctaButton: '#3498db',
  });
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isBannerGenerated, setIsBannerGenerated] = useState(false);

  const handleSelectTemplate = (templateType: string) => {
    setSelectedTemplate(templateType);
  };

  const handleGenerateAdText = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content:`Generate an ad for: ${userInput}` },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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', 
          },
        }
      );

      const generatedAdText = response.data.choices[0]?.message?.content || 'Default Ad Text';
      setGeneratedText(generatedAdText);
    } catch (error) {
      console.error('API error for the ad:', error);
    }
  };

  const handleGenerateBanner = async () => {
    try {
      await handleGenerateAdText();

      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-3',
          prompt: `Generate an ad for: ${userInput}`, 
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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', 
          },
        }
      );

      const imageUrl = response.data.data[0].url;
      setGeneratedImageUrl(imageUrl);

      setIsBannerGenerated(true);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
  };

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandNameInput(e.target.value);
  };

  const handleColorChange = (type: string, color: string) => {
    setSelectedColors((prevColors) => ({ ...prevColors, [type]: color }));
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrlInput}
          onChange={handleImageUrlChange}
        />
      </div>
      <div>
        <label htmlFor="brandName">Brand Name:</label>
        <input
          type="text"
          id="brandName"
          value={brandNameInput}
          onChange={handleBrandNameChange}
        />
      </div>
      <label htmlFor="backgroundColor">Background Color:</label>
      <input
        type="color"
        id="backgroundColor"
        value={selectedColors.background}
        onChange={(e) => handleColorChange('background', e.target.value)}
      />
      <label htmlFor="textColor">Text Color:</label>
      <input
        type="color"
        id="textColor"
        value={selectedColors.text}
        onChange={(e) => handleColorChange('text', e.target.value)}
      />
      <label htmlFor="ctaButtonColor">CTA Button Color:</label>
      <input
        type="color"
        id="ctaButtonColor"
        value={selectedColors.ctaButton}
        onChange={(e) => handleColorChange('ctaButton', e.target.value)}
      />
      <div>
        <label htmlFor="userInput">Your Creative Text:</label>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={handleUserInputChange}
        />
      </div>
      <div>
        <button onClick={handleGenerateBanner}>Generate Banner</button>
      </div>
      {isBannerGenerated && (
        <div>
          <BannerTemplate
            imageUrl={imageUrlInput || generatedImageUrl || '/img.png'}
            adText={generatedText}
            ctaText="Call to Action"
            templateType={selectedTemplate}
            brandName={brandNameInput}
            colors={selectedColors}
          />
          {/* Additional elements related to the generated banner */}
        </div>
      )}
    </div>
  );
};

export default BannerGenerator;