import { getItem, setItem, getAllItems, removeItem } from '../utils/db';

import type { IBase } from './Base';

interface IVotingPowerTransfer {
  democracyId: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
}

export interface IParticipant extends IBase {
  address: string;
  democracyId: string;
  transfers: IVotingPowerTransfer[];
}

export const getParticipant = async (hash: string): Promise<IParticipant> => {
  try {
    const participant = await getItem('participants', hash);
    return participant as IParticipant;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllParticipants = async (
  democracyId: string,
): Promise<IParticipant[]> => {
  try {
    const participants = (await getAllItems('participants')) as IParticipant[];
    const participantsForSpecificDemocracy: IParticipant[] = [];

    for (let i = 0; i < participants.length; i++) {
      if (participants[i].democracyId === democracyId) {
        participantsForSpecificDemocracy.push(participants[i]);
      }
    }

    return participantsForSpecificDemocracy;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setParticipant = async (
  participant: IParticipant,
): Promise<void> => {
  try {
    await setItem('participants', participant);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteParticipant = async (hash: string): Promise<void> => {
  try {
    await removeItem('participants', hash);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
