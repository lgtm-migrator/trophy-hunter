import Modal from './Modal';
import styled from '@emotion/styled';
import Squid from '../icons/Squid';
import usePersistentState from '../../hooks/usePersistentState';
import { i18n } from '../../lib/i18n/i18n';
import { closeCurrentWindow } from '../../lib/overwolf';

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const Text = styled.p`
  text-align: center;
`;

const GarenaModal = () => {
  const [isGarenaUser] = usePersistentState('isGarenaUser', null);

  if (!isGarenaUser) {
    return null;
  }

  return (
    <Modal title="Garena is not supported" onClose={closeCurrentWindow}>
      <Container>
        <Text>
          {i18n(
            'We are very sorry, but Garena is not supported. There are technical restrictions, which make it impossible to access summoner and match data from Riot.'
          )}
        </Text>
        <Squid />
      </Container>
    </Modal>
  );
};

export default GarenaModal;
