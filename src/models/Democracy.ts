import { getAllParticipants, deleteParticipant } from './Participant';
import { getAllAlternatives, deleteAlternative } from './Alternative';

import type { IBase } from './Base';
import type { IParticipant } from './Participant';
import type { IAlternative } from './Alternative';

import {
  sha256,
  getItem,
  getAllItems,
  setItem,
  updateItem,
  removeItem,
} from '../utils/db';

export interface IDemocracy extends IBase {
  id: string;
  title: string;
  participantLists: string[];
  rebalancingCost: number;
  maxRepresentatives: number;
  // in unix timestamp
  startDate: number;
  // after that only representatives can propose vote alternatives
  stopDate: number;
  ownTokenAddress?: string;
  participants: IParticipant[];
  alternatives: IAlternative[];
}

export const getDemocracy = async (hash: string): Promise<IDemocracy> => {
  try {
    const democracy = await getItem('democracies', hash);
    return democracy as IDemocracy;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllDemocracies = async (): Promise<IDemocracy[]> => {
  try {
    const democracies = await getAllItems('democracies');
    return democracies as IDemocracy[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setDemocracy = async (democracy: IDemocracy): Promise<void> => {
  try {
    await setItem('democracies', democracy);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrSetDemocracy = async (id: string): Promise<IDemocracy> => {
  try {
    const hash = await sha256(id);
    const existingDemocracy = await getDemocracy(hash);
    if (!existingDemocracy) {
      // const mintKeypair = convertBase64URLToKeypair(address);
      // const mintAccountPublicKey = new PublicKey(address);
      // const pda = await getContractPDA(mintAccountPublicKey);
      // const democracyState = await decodeDemocracyState(connection, pda);
      const newDemocracy: IDemocracy = {
        hash,
        id,
        title: 'Some title',
        participantLists: ['Some list', 'another list'],
        rebalancingCost: 1,
        // rebalancingCost: 0.01,
        maxRepresentatives: 100,
        startDate: Date.now(),
        stopDate: Date.now(),
        participants: [],
        alternatives: [],
      };
      await setDemocracy(newDemocracy);
      return newDemocracy;
    } else {
      return existingDemocracy;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDemocracy = async (democracy: IDemocracy): Promise<void> => {
  try {
    await updateItem('democracies', democracy);
  } catch (error) {
    console.log(error);
  }
};

// also deletes associated vote participants and alternatives
export const deleteDemocracy = async (hash: string): Promise<void> => {
  try {
    const democracy = await getDemocracy(hash);
    const democracyId = democracy.id;
    await removeItem('democracies', hash);
    const associatedParticipants = await getAllParticipants(democracyId);
    for (let i = 0; i < associatedParticipants.length; i++) {
      await deleteParticipant(associatedParticipants[i].hash);
    }
    const associatedAlternatives = await getAllAlternatives(democracyId);
    for (let i = 0; i < associatedAlternatives.length; i++) {
      await deleteAlternative(associatedAlternatives[i].hash);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
