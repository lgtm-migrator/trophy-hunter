import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';
import { getLocalStorageItem } from '../../lib/utils/storage';

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const NotificationContainer: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    const notificationsOnRightSide = getLocalStorageItem<boolean>(
      'notificationsOnRightSide',
      false
    );

    overwolf.games.getRunningGameInfo((game) => {
      overwolf.windows.getCurrentWindow((result) => {
        const left = notificationsOnRightSide
          ? game.logicalWidth - 30 - 440
          : 30;
        const top = game.logicalHeight - 173;
        overwolf.windows.changePosition(result.window.id, left, top);
      });
    });
  }, []);

  return <Container>{children}</Container>;
};

export default NotificationContainer;
