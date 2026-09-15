import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CustomLogoData,
  getAllCustomLogos,
  saveCustomLogo,
  deleteCustomLogo,
  clearAllCustomLogos,
  processLogoFile,
} from '../lib/logoStorage';

interface LogoContextType {
  logos: Record<string, CustomLogoData | null>;
  loading: boolean;
  getCustomLogo: (companyId: string) => CustomLogoData | null;
  uploadLogo: (companyId: string, file: File) => Promise<CustomLogoData>;
  removeLogo: (companyId: string) => Promise<void>;
  updateBgStyle: (
    companyId: string,
    bgStyle: 'transparent' | 'white' | 'dark' | 'auto'
  ) => Promise<void>;
  resetAllLogos: () => Promise<void>;
  isLogoModalOpen: boolean;
  activeModalCompany: string;
  openLogoModal: (companyId?: string) => void;
  closeLogoModal: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logos, setLogos] = useState<Record<string, CustomLogoData | null>>({
    'sr-group': null,
    'suhel-engineering': null,
    'sr-infra': null,
    'sr-power-solution': null,
  });
  const [loading, setLoading] = useState(true);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [activeModalCompany, setActiveModalCompany] = useState<string>('sr-group');

  // Load custom logos on mount
  useEffect(() => {
    let isMounted = true;
    getAllCustomLogos().then((loadedLogos) => {
      if (isMounted) {
        setLogos((prev) => ({
          ...prev,
          ...loadedLogos,
        }));
        setLoading(false);
      }
    }).catch((err) => {
      console.error('Error loading custom logos:', err);
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const getCustomLogo = (companyId: string): CustomLogoData | null => {
    return logos[companyId] || null;
  };

  const uploadLogo = async (companyId: string, file: File): Promise<CustomLogoData> => {
    const processedLogo = await processLogoFile(file, companyId);
    await saveCustomLogo(processedLogo);

    setLogos((prev) => ({
      ...prev,
      [companyId]: processedLogo,
    }));

    return processedLogo;
  };

  const removeLogo = async (companyId: string): Promise<void> => {
    await deleteCustomLogo(companyId);
    setLogos((prev) => ({
      ...prev,
      [companyId]: null,
    }));
  };

  const updateBgStyle = async (
    companyId: string,
    bgStyle: 'transparent' | 'white' | 'dark' | 'auto'
  ): Promise<void> => {
    const existing = logos[companyId];
    if (!existing) return;

    const updated: CustomLogoData = {
      ...existing,
      bgStyle,
    };

    await saveCustomLogo(updated);
    setLogos((prev) => ({
      ...prev,
      [companyId]: updated,
    }));
  };

  const resetAllLogos = async (): Promise<void> => {
    await clearAllCustomLogos();
    setLogos({
      'sr-group': null,
      'suhel-engineering': null,
      'sr-infra': null,
      'sr-power-solution': null,
    });
  };

  const openLogoModal = (companyId: string = 'sr-group') => {
    setActiveModalCompany(companyId);
    setIsLogoModalOpen(true);
  };

  const closeLogoModal = () => {
    setIsLogoModalOpen(false);
  };

  return (
    <LogoContext.Provider
      value={{
        logos,
        loading,
        getCustomLogo,
        uploadLogo,
        removeLogo,
        updateBgStyle,
        resetAllLogos,
        isLogoModalOpen,
        activeModalCompany,
        openLogoModal,
        closeLogoModal,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogos = (): LogoContextType => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogos must be used within a LogoProvider');
  }
  return context;
};
