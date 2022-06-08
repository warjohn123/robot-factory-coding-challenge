export const API_ROUTES = {
  robot: `/robots`,
  extinguish: (robotId: number) => `/robots/${robotId}/extinguish`,
  recycle: `/robots/recycle`,
};
