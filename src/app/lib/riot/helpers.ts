import {
  MatchTimeline,
  Position,
  Match,
  Participant,
  MatchEvent,
  ChampionKillEvent,
  MatchTimelineFrame,
  ParticipantFrame,
} from './types';
import {
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  THIRTY_SECONDS,
  FOURTY_FIVE_MINUTES,
} from '../utils/dates';

export const SUMMONERS_RIFT_MAP_ID = 11;
export const HOWLING_ABYSS_MAP_ID = 12;
export const MAP_LABELS = {
  [SUMMONERS_RIFT_MAP_ID]: "Summoner's Rift",
  [HOWLING_ABYSS_MAP_ID]: 'ARAM',
};

export const eventTimeToTimestamp = (eventTime: number): number => {
  return eventTime * 1000;
};

export const calcDeathTime = (level: number, timestamp: number): number => {
  let baseTimer = 0;
  if (level <= 6) {
    baseTimer = 4 + 2 * level;
  } else if (level === 7) {
    baseTimer = 21;
  } else {
    baseTimer = 8 + 2.5 * level;
  }
  let timeMultiplier = 1.0;
  if (timestamp > FIFTEEN_MINUTES && timestamp <= THIRTY_MINUTES) {
    timeMultiplier +=
      ((timestamp - FIFTEEN_MINUTES) / THIRTY_SECONDS) * 0.00425;
  } else if (timestamp > THIRTY_MINUTES && timestamp <= FOURTY_FIVE_MINUTES) {
    timeMultiplier +=
      0.1275 + ((timestamp - THIRTY_MINUTES) / THIRTY_SECONDS) * 0.003;
  } else if (timestamp > FOURTY_FIVE_MINUTES) {
    timeMultiplier +=
      0.2175 + ((timestamp - FOURTY_FIVE_MINUTES) / THIRTY_SECONDS) * 0.0175;
  }
  // time multiplier maxes out at 50%
  timeMultiplier = Math.max(timeMultiplier, 1.5);
  const deathTime = baseTimer * timeMultiplier * 1000;
  return deathTime;
};

export const getAllEvents = (timeline: MatchTimeline): MatchEvent[] => {
  return timeline.info.frames.reduce(
    (current, frame) => [...current, ...frame.events],
    []
  );
};

export const getMinionsAtMin = (
  timeline: MatchTimeline,
  minute: number,
  participantId: number
): number => {
  const frame = timeline.info.frames[minute];
  if (!frame) {
    return 0;
  }
  const participantFrame = Object.values(frame.participantFrames).find(
    (participantFrame) => participantFrame.participantId === participantId
  );
  return participantFrame.minionsKilled + participantFrame.jungleMinionsKilled;
};

export const getLevelUps = (
  events: MatchEvent[],
  participantId: number
): MatchEvent[] => {
  return events.filter(
    (event) =>
      event.type === 'SKILL_LEVEL_UP' &&
      event.levelUpType === 'NORMAL' &&
      event.participantId === participantId
  );
};

export const calcLevel = (
  events: MatchEvent[],
  participantId: number,
  timestamp: number
): number => {
  const levelUps = getLevelUps(events, participantId);
  return levelUps.filter((levelUp) => levelUp.timestamp <= timestamp).length;
};

export const TURRET_POSITIONS_BY_TEAM = {
  100: [
    [981, 10441], // BLUE_TOP_LANE_OUTER_TURRET
    [1512, 6699], // BLUE_TOP_LANE_INNER_TURRET
    [1169, 4287], // BLUE_TOP_LANE_BASE_TURRET
    [5846, 6396], // BLUE_MID_LANE_OUTER_TURRET
    [5048, 4812], // BLUE_MID_LANE_INNER_TURRET
    [3651, 3696], // BLUE_MID_LANE_BASE_TURRET
    [10504, 1029], // BLUE_BOT_LANE_OUTER_TURRET
    [6919, 1483], // BLUE_BOT_LANE_INNER_TURRET
    [4281, 1253], // BLUE_BOT_LANE_BASE_TURRET
    [1748, 2270], // BLUE_TOP_LANE_NEXUS_TURRET
    [2177, 1807], // BLUE_BOT_LANE_NEXUS_TURRET
  ],
  200: [
    [4318, 13875], // RED_TOP_LANE_OUTER_TURRET
    [7943, 13411], // RED_TOP_LANE_INNER_TURRET
    [10481, 13650], // RED_TOP_LANE_BASE_TURRET
    [8955, 8510], // RED_MID_LANE_OUTER_TURRET
    [9767, 10113], // RED_MID_LANE_INNER_TURRET
    [11134, 11207], // RED_MID_LANE_BASE_TURRET
    [13866, 4505], // RED_BOT_LANE_OUTER_TURRET
    [13327, 8226], // RED_BOT_LANE_INNER_TURRET
    [13624, 10572], // RED_BOT_LANE_BASE_TURRET
    [12611, 13084], // RED_TOP_LANE_NEXUS_TURRET
    [13052, 12612], // RED_BOT_LANE_NEXUS_TURRET
  ],
};
export const TURRET_RANGE = 850;
export const BUFF_POSITIONS = [
  [7700, 3800],
  [3600, 8000],
  [7100, 11000],
  [11100, 6900],
];

export const isInEnemyTurretRange = (
  position: Position,
  teamId: number
): boolean => {
  const turretPositions = TURRET_POSITIONS_BY_TEAM[teamId];

  return turretPositions.some((turretPosition) => {
    return (
      Math.sqrt(
        Math.pow(position.x - turretPosition[0], 2) +
          Math.pow(position.y - turretPosition[1], 2)
      ) <= TURRET_RANGE
    );
  });
};

export const getParticipantBySummonerName = (
  match: Match,
  summonerName: string
): Participant => {
  return match.info.participants.find(
    (participant) => participant.summonerName === summonerName
  );
};

export const getAllEventsByType = (
  events: MatchEvent[],
  type: string
): MatchEvent[] => {
  return events.filter((event) => event.type === type);
};

export const getAllKills = (events: MatchEvent[]): ChampionKillEvent[] => {
  return <ChampionKillEvent[]>getAllEventsByType(events, 'CHAMPION_KILL');
};

export const getParticipantKills = (
  events: MatchEvent[],
  participantId: number
): ChampionKillEvent[] => {
  return <ChampionKillEvent[]>(
    events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' && event.killerId === participantId
    )
  );
};

export const getParticipantSoloKills = (
  events: MatchEvent[],
  participantId: number
): MatchEvent[] => {
  return events.filter(
    (event) =>
      event.type === 'CHAMPION_KILL' &&
      event.killerId === participantId &&
      (!event.assistingParticipantIds ||
        event.assistingParticipantIds.length === 0)
  );
};

export const getParticipantKillsAndAssists = (
  events: MatchEvent[],
  participantId: number
): ChampionKillEvent[] => {
  return <ChampionKillEvent[]>(
    events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        (event.killerId === participantId ||
          event.assistingParticipantIds?.includes(participantId))
    )
  );
};

export const getParticipantDeaths = (
  events: MatchEvent[],
  participantId: number
): ChampionKillEvent[] => {
  return <ChampionKillEvent[]>(
    events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' && event.victimId === participantId
    )
  );
};

export const getParticipantAssists = (
  events: MatchEvent[],
  participantId: number
): ChampionKillEvent[] => {
  return <ChampionKillEvent[]>(
    events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.assistingParticipantIds?.includes(participantId)
    )
  );
};

export const getFrameAtMin = (
  timeline: MatchTimeline,
  min: number
): MatchTimelineFrame | undefined => {
  return timeline.info.frames[min - 1];
};

export const getParticipantFrameAtMin = (
  timeline: MatchTimeline,
  participantId: number,
  min: number
): ParticipantFrame | undefined => {
  const frame = getFrameAtMin(timeline, min);
  if (!frame) {
    return undefined;
  }
  return frame.participantFrames[participantId];
};

export const getLaneOpponent = (
  participants: Participant[],
  participant: Participant
): Participant => {
  const laneOpponents = participants.filter(
    (otherParticipant) =>
      otherParticipant.teamId !== participant.teamId &&
      otherParticipant.teamPosition === participant.teamPosition
  );
  if (laneOpponents.length === 1) {
    return laneOpponents[0];
  }
  if (laneOpponents.length > 1) {
    const sameIndividualPosition = laneOpponents.find(
      (opponent) =>
        opponent.individualPosition === participant.individualPosition
    );
    if (!sameIndividualPosition) {
      return laneOpponents[0];
    }
  }
  console.warn(
    `Can not find lane opponent for ${participant.summonerName} as ${participant.teamPosition} and ${participant.individualPosition}`
  );
  return null;
};

export const getTeammates = (
  match: Match,
  participant: Participant
): Participant[] => {
  return match.info.participants.filter(
    (matchParticipant) =>
      matchParticipant.teamId === participant.teamId &&
      matchParticipant.participantId !== participant.participantId
  );
};

export const getOpponents = (
  match: Match,
  participant: Participant
): Participant[] => {
  return match.info.participants.filter(
    (matchParticipant) => matchParticipant.teamId !== participant.teamId
  );
};

export const getTeam = (match: Match, teamId: number): Participant[] => {
  return match.info.participants.filter(
    (matchParticipant) => matchParticipant.teamId === teamId
  );
};

export const getOtherParticipants = (
  match: Match,
  participant: Participant
): Participant[] => {
  return match.info.participants.filter(
    (matchParticipant) =>
      matchParticipant.participantId !== participant.participantId
  );
};

export const calcTotalGoldFrames = (
  timeline: MatchTimeline,
  teamId: number
) => {
  const teamThreshold = 5;
  return timeline.info.frames.map(({ participantFrames }) => {
    let result = 0;
    let from;
    let to;
    if (teamId === 100) {
      from = 1;
      to = teamThreshold + 1;
    } else {
      from = teamThreshold + 1;
      to = teamThreshold * 2 + 1;
    }
    for (let i = from; i < to; i++) {
      if (participantFrames[i]) {
        result += participantFrames[i].totalGold;
      }
    }
    return result;
  });
};

export const calcKDA = (participant: Participant) => {
  return (participant.kills + participant.assists) / participant.deaths || 0;
};
