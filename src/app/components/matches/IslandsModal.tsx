import { FC, useState } from 'react';
import Modal from '../modals/Modal';
import Lottie from 'react-lottie';
import animationData from './confetti.json';
import LottieContainer from './LottieContainer';
import {
  CombatIsland,
  SkillsIsland,
  TeamworkIsland,
  SpecialIsland,
  EpicIsland,
  ObjectivesIsland,
  HubIsland,
} from '../islands';
import Slide from '../icons/Slide';
import styled from '@emotion/styled';
import { useAccount } from '../../contexts/account';
import { i18n } from '../../lib/i18n/i18n';

const islands = {
  hub: { Component: HubIsland, title: 'Hub Island' },
  combat: { Component: CombatIsland, title: 'Combat Island' },
  skills: { Component: SkillsIsland, title: 'Skills Island' },
  teamwork: { Component: TeamworkIsland, title: 'Teamwork Island' },
  special: { Component: SpecialIsland, title: 'Special Island' },
  epic: { Component: EpicIsland, title: 'Epic Island' },
  objectives: { Component: ObjectivesIsland, title: 'Objectives Island' },
};

const Container = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: 1fr auto auto;
  height: 100%;
  overflow: hidden;
`;

const SlidesActions = styled.div`
  svg {
    cursor: pointer;
    margin: 2px;
  }
`;

interface IslandsModalProps {
  onClose(): void;
  unlockedIslandNames: string[];
}
const IslandsModal: FC<IslandsModalProps> = ({
  onClose,
  unlockedIslandNames,
}) => {
  const [slide, setSlide] = useState(0);
  const islandName = unlockedIslandNames[slide];
  const island = islands[islandName];
  const { account } = useAccount();

  return (
    <Modal
      onClose={onClose}
      title={
        unlockedIslandNames.length === 1
          ? i18n('You have unlocked an island!')
          : `${i18n('You have unlocked')} ${unlockedIslandNames.length} ${i18n(
              'islands!'
            )}`
      }
    >
      <Container>
        <island.Component
          onLevelClick={() => {
            return;
          }}
          levels={account?.levels || []}
        />
        <h3>{island.title}</h3>
        <SlidesActions>
          {unlockedIslandNames.map((islandName, index) => (
            <Slide
              key={islandName}
              active={index === slide}
              onClick={() => setSlide(index)}
            />
          ))}
        </SlidesActions>
      </Container>
      <LottieContainer>
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={500}
          width={666}
        />
      </LottieContainer>
    </Modal>
  );
};

export default IslandsModal;
