import { RobotStatusEnum } from "enums/robots";

const hasFewerThanThreeOrGreaterThanEightRotors = (numberOfRotors: number) => {
  return numberOfRotors < 3 || numberOfRotors > 8;
};

const hasRotorsAndBlueInColour = (numberOfRotors: number, Colour: string) => {
  return numberOfRotors && Colour === "blue";
};

const hasBothWheelsAndTrakcs = (hasWheels: boolean, hasTracks: boolean) => {
  return hasWheels && hasTracks;
};

const hasWheelsAndIsRusty = (hasWheels: boolean, isRusty: boolean) => {
  return hasWheels && isRusty;
};

const isSentientAndHasScrewsLoose = (
  hasSentience: boolean,
  hasScrewsLoose: boolean
) => {
  return hasSentience && hasScrewsLoose;
};

export const isOnFire = (isOnFire: boolean) => {
  return isOnFire;
};

export const isRecyclable = (robot: Robot) => {
  const {
    numberOfRotors,
    Colour: rotorColour,
    hasTracks,
    hasWheels,
    hasSentience,
  } = robot.configuration;
  const { statuses } = robot;
  return (
    hasFewerThanThreeOrGreaterThanEightRotors(numberOfRotors) ||
    hasRotorsAndBlueInColour(numberOfRotors, rotorColour) ||
    hasBothWheelsAndTrakcs(hasWheels, hasTracks) ||
    hasWheelsAndIsRusty(hasWheels, statuses.includes(RobotStatusEnum.RUSTY)) ||
    isSentientAndHasScrewsLoose(
      hasSentience,
      statuses.includes(RobotStatusEnum.LOOSE_SCREWS)
    ) ||
    isOnFire(statuses.includes(RobotStatusEnum.ON_FIRE))
  );
};
