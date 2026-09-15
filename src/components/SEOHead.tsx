import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'SR GROUP | Industrial Engineering, Infrastructure & Power Solutions',
  description = 'SR GROUP is an Indian industrial engineering group delivering heavy structural fabrication, erection, pipeline installation, process plant works, and HT/LT power solutions across India through NEW SR INFRA, SUHEL ENGINEERING, and SR POWER SOLUTION.',
  keywords = [
    'Industrial Fabrication Company',
    'Structural Fabrication & Erection',
    'Industrial Engineering Company',
    'Pipeline Fabrication',
    'Pipeline Erection',
    'Power Plant Services',
    'Industrial Electrical Services',
    'Plant Maintenance',
    'Industrial Construction Company',
    'Steel Plant Services',
    'Engineering Fabrication Company India',
    'SR Group',
    'NEW SR INFRA',
    'Suhel Engineering',
    'SR Power Solution'
  ],
  canonicalPath = '/'
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));

    // Update Schema Markup (JSON-LD)
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SR GROUP',
      alternateName: ['NEW SR INFRA', 'SUHEL ENGINEERING', 'SR POWER SOLUTION'],
      url: window.location.origin + canonicalPath,
      logo: window.location.origin + '/icon.png',
      description: description,
      knowsAbout: keywords,
      subOrganization: [
        {
          '@type': 'Organization',
          name: 'NEW SR INFRA',
          description: 'Industrial Infrastructure & Heavy Structural Fabrication'
        },
        {
          '@type': 'Organization',
          name: 'SUHEL ENGINEERING',
          description: 'Industrial Engineering, Process Piping & Plant Maintenance'
        },
        {
          '@type': 'Organization',
          name: 'SR POWER SOLUTION',
          description: 'Power & Electrical Engineering Solutions, HT/LT Installations'
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, canonicalPath]);

  return null;
};
