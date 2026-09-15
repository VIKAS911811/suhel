import React, { createContext, useContext, useState, useEffect } from 'react';
import { CmdData, DEFAULT_CMD_DATA, DEFAULT_MD_DATA, getCmdProfile, saveCmdProfile, resetCmdProfile, processCmdPhotoFile } from '../lib/cmdStorage';

interface CmdContextType {
  cmdData: CmdData;
  mdData: CmdData;
  activeRole: 'cmd' | 'md';
  setActiveRole: (role: 'cmd' | 'md') => void;
  loading: boolean;
  isModalOpen: boolean;
  openCmdModal: (role?: 'cmd' | 'md') => void;
  closeCmdModal: () => void;
  updateCmdProfile: (updatedData: Partial<CmdData>, role?: 'cmd' | 'md') => Promise<void>;
  uploadCmdPhoto: (file: File, role?: 'cmd' | 'md') => Promise<void>;
  resetToDefaultCmd: (role?: 'cmd' | 'md') => Promise<void>;
}

const CmdContext = createContext<CmdContextType | undefined>(undefined);

export const CmdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmdData, setCmdData] = useState<CmdData>(DEFAULT_CMD_DATA);
  const [mdData, setMdData] = useState<CmdData>(DEFAULT_MD_DATA);
  const [activeRole, setActiveRole] = useState<'cmd' | 'md'>('cmd');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getCmdProfile('cmd'), getCmdProfile('md')])
      .then(([cmd, md]) => {
        if (isMounted) {
          setCmdData(cmd);
          setMdData(md);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading Leadership profiles:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openCmdModal = (role: 'cmd' | 'md' = 'cmd') => {
    setActiveRole(role);
    setIsModalOpen(true);
  };

  const closeCmdModal = () => setIsModalOpen(false);

  const updateCmdProfile = async (updatedFields: Partial<CmdData>, role: 'cmd' | 'md' = activeRole) => {
    const targetData = role === 'md' ? mdData : cmdData;
    const newData = { ...targetData, ...updatedFields, updatedAt: new Date().toISOString() };
    if (role === 'md') {
      setMdData(newData);
    } else {
      setCmdData(newData);
    }
    await saveCmdProfile(newData, role);
  };

  const uploadCmdPhoto = async (file: File, role: 'cmd' | 'md' = activeRole) => {
    const { dataUrl, width, height } = await processCmdPhotoFile(file);
    const targetData = role === 'md' ? mdData : cmdData;
    const newData = {
      ...targetData,
      photoDataUrl: dataUrl,
      photoWidth: width,
      photoHeight: height,
      updatedAt: new Date().toISOString(),
    };
    if (role === 'md') {
      setMdData(newData);
    } else {
      setCmdData(newData);
    }
    await saveCmdProfile(newData, role);
  };

  const resetToDefaultCmd = async (role: 'cmd' | 'md' = activeRole) => {
    const resetData = await resetCmdProfile(role);
    if (role === 'md') {
      setMdData(resetData);
    } else {
      setCmdData(resetData);
    }
  };

  return (
    <CmdContext.Provider
      value={{
        cmdData,
        mdData,
        activeRole,
        setActiveRole,
        loading,
        isModalOpen,
        openCmdModal,
        closeCmdModal,
        updateCmdProfile,
        uploadCmdPhoto,
        resetToDefaultCmd,
      }}
    >
      {children}
    </CmdContext.Provider>
  );
};

export const useCmd = () => {
  const context = useContext(CmdContext);
  if (!context) {
    throw new Error('useCmd must be used within a CmdProvider');
  }
  return context;
};
