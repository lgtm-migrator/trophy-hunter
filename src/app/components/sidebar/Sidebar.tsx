import { FC } from 'react';
import styled from '@emotion/styled';
import Settings from '../icons/Settings';
import ToolButton from '../tools/ToolButton';
import Grow from '../common/Grow';
import { Link } from 'react-router-dom';

const Aside = styled.aside`
  width: 75px;
  padding-top: 48px;
  background: #222;
  border-right: 1px solid #3f3e43;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

interface SidebarLinkProps {
  active?: boolean;
  comingSoon?: boolean;
}

const SidebarLink = styled.a<SidebarLinkProps>`
  display: grid;
  place-items: center;
  height: 75px;
  width: 100%;
  background: ${(props) => (props.active ? '#2B2A30' : '#222')};
  border-bottom: 1px solid #3f3e43;
  cursor: ${(props) => (props.comingSoon ? 'inherit' : 'pointer')};
  transition: 0.15s;
  opacity: ${(props) => (props.comingSoon ? 0.4 : 1)};

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    background-color: ${(props) => (props.comingSoon ? 'inherit' : '#818c99')};
  }
`;

interface SidebarProps {
  activeTool: string;
  onToolClick(tool: string): void;
}

const Sidebar: FC<SidebarProps> = ({ activeTool, onToolClick }) => {
  return (
    <Aside>
      <Link to="/?subpage=map">
        <SidebarLink active>
          <img src="/league-of-legends.png" />
        </SidebarLink>
      </Link>
      <Grow />
      <ToolButton
        icon={<img src="/trophies.png" />}
        active={activeTool === 'collection'}
        onClick={() => onToolClick('collection')}
      />
      <ToolButton
        icon={<Settings />}
        active={activeTool === 'settings'}
        onClick={() => onToolClick('settings')}
      />
    </Aside>
  );
};

export default Sidebar;
