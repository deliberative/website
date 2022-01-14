import { getItem, setItem, getAllItems, removeItem } from '../utils/db';

import type { IBase } from './Base';

export interface IAlternative extends IBase {
  address: string;
  democracyId: string;
  proposedByAddress: string;
  votingPowerFor: number;
}

export const getAlternative = async (hash: string): Promise<IAlternative> => {
  try {
    const alternative = await getItem('alternatives', hash);
    return alternative as IAlternative;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllAlternatives = async (democracyId: string): Promise<IAlternative[]> => {
  try {
    const alternatives = (await getAllItems('alternatives')) as IAlternative[];
    const alternativesForSpecificDemocracy: IAlternative[] = [];

    for (let i = 0; i < alternatives.length; i++) {
      if (alternatives[i].democracyId === democracyId) {
        alternativesForSpecificDemocracy.push(alternatives[i]);
      }
    }

    return alternativesForSpecificDemocracy;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setAlternative = async (alternative: IAlternative): Promise<void> => {
  try {
    await setItem('alternatives', alternative);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAlternative = async (hash: string): Promise<void> => {
  try {
    await removeItem('alternatives', hash);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
