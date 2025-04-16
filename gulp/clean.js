import { deleteAsync } from "del";

export const cleanTask = () => {
  return deleteAsync([`${app.paths.dist.dist}/**`]);
};
