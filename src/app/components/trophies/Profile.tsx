import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getRecentVersion } from '../../lib/riot';
import { useTargetAccount } from '../../contexts/account';
import MissionsModal from '../modals/MissionsModal';
import { Tooltip } from '../tooltip';
import { allTrophies } from './client';
import { i18n } from '../../lib/i18n/i18n';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 8px;
  border: 1px solid #eaeaea;
`;

const ModalLink = styled.a`
  cursor: pointer;
  text-decoration: none;

  :active {
    text-decoration: none;
  }
`;

const Profile = () => {
  const account = useTargetAccount();
  const { data: version } = useQuery('version', getRecentVersion);
  const [showMissions, setShowMissions] = useState(false);

  return (
    <Container>
      <Avatar
        src={
          version && account && account.summoner.profileIconId !== undefined
            ? `https://ddragon.leagueoflegends.com/cdn/${version.riot}/img/profileicon/${account.summoner.profileIconId}.png`
            : '/unknown.png'
        }
        alt=""
      />
      <div>
        <h4>{account?.summoner.name || i18n('Start LoL to Sign-In')}</h4>
        <p>
          <span>
            {account
              ? account.trophies.filter(
                  (trophy) => trophy.status === 'completed'
                ).length
              : 0}
            /{allTrophies.length} {i18n('Trophies')}
          </span>{' '}
          |{' '}
          <Tooltip
            text={i18n(
              'Missions are random trophies which are shuffled every Sunday. They are not part of the trophies count.'
            )}
            placement="top"
          >
            <ModalLink onClick={() => setShowMissions(true)}>
              {account?.missionTrophiesCompleted || 0} {i18n('Missions')}
            </ModalLink>
          </Tooltip>
        </p>
      </div>
      {showMissions && (
        <MissionsModal
          onClose={() => setShowMissions(false)}
          account={account}
        />
      )}
    </Container>
  );
};

export default Profile;
