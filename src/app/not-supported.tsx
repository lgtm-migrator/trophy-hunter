import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { closeCurrentWindow, getAppVersion } from './lib/overwolf';
import Timer from './components/common/Timer';
import NotificationHeader from './components/notifications/NotificationHeader';
import NotificationTitle from './components/notifications/NotificationTitle';
import NotificationContainer from './components/notifications/NotificationContainer';
import { log } from './lib/logs';
import App from './App';

getAppVersion().then((version) => log(`Running ${version}`));

const Message = styled.div`
  background-image: url(./notifications/all.png);
  background-position: bottom center;
  background-repeat: no-repeat;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NotSupported = () => {
  return (
    <NotificationContainer>
      <NotificationHeader>
        <NotificationTitle>Game Mode Unsupported</NotificationTitle>
        <Timer onDone={closeCurrentWindow} />
      </NotificationHeader>
      <Message>
        <h3>
          Trophy Hunter is currently supporting Summoner&apos;s Rift and ARAM
          only.
        </h3>
      </Message>
    </NotificationContainer>
  );
};

ReactDOM.render(
  <StrictMode>
    <App>
      <NotSupported />
    </App>
  </StrictMode>,
  document.querySelector('#root')
);
