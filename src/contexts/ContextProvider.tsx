import React, { FC, ReactNode } from 'react';
import { EditProvider } from './EditContext';
import { ItemProvider } from './ItemContext';
import { ModalProvider } from './ModalContext';
import { SettingsProvider } from './SettingsContext';
import { ShareProvider } from './ShareContext';
import { UserProvider } from './UserContext';

type Props = {
  children: ReactNode;
};
export const ContextProvider: FC<Props> = ({ children }) => {
  return (
    <ModalProvider>
      <UserProvider>
        <EditProvider>
          <ShareProvider>
            <ItemProvider>
              <SettingsProvider>
                <UserProvider>{children}</UserProvider>
              </SettingsProvider>
            </ItemProvider>
          </ShareProvider>
        </EditProvider>
      </UserProvider>
    </ModalProvider>
  );
};
