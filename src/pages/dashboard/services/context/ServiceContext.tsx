
import React, { createContext, useContext } from 'react';
import { useServiceForm } from '../hooks/useServiceForm';

// Create the context
const ServiceContext = createContext<ReturnType<typeof useServiceForm> | undefined>(undefined);

// Provider component
export const ServiceProvider: React.FC<{
  children: React.ReactNode;
  serviceId?: string;
}> = ({ children, serviceId }) => {
  const serviceFormProps = useServiceForm(serviceId);
  
  return (
    <ServiceContext.Provider value={serviceFormProps}>
      {children}
    </ServiceContext.Provider>
  );
};

// Hook to use the service context
export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};
