export const calculatePage = (offset: number, limit: number): number =>
  !offset && !limit ? 1 : Math.floor(offset / limit) + 1;
