import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { db } from '../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';

const OFFLINE_STORAGE_KEY = '@sparkshift/offline_data';
const PENDING_ACTIONS_KEY = '@sparkshift/pending_actions';

export const initOfflineSync = () => {
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncOfflineData();
    }
  });
};

export const saveOfflineData = async (data: any) => {
  try {
    await AsyncStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving offline data:', error);
  }
};

export const getOfflineData = async () => {
  try {
    const data = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting offline data:', error);
    return null;
  }
};

export const queueOfflineAction = async (action: {
  type: string;
  path: string;
  data: any;
}) => {
  try {
    const pendingActions = await AsyncStorage.getItem(PENDING_ACTIONS_KEY);
    const actions = pendingActions ? JSON.parse(pendingActions) : [];
    actions.push({ ...action, timestamp: Date.now() });
    await AsyncStorage.setItem(PENDING_ACTIONS_KEY, JSON.stringify(actions));
  } catch (error) {
    console.error('Error queuing offline action:', error);
  }
};

const syncOfflineData = async () => {
  try {
    const pendingActions = await AsyncStorage.getItem(PENDING_ACTIONS_KEY);
    if (!pendingActions) return;

    const actions = JSON.parse(pendingActions);
    for (const action of actions) {
      await processOfflineAction(action);
    }

    await AsyncStorage.removeItem(PENDING_ACTIONS_KEY);
  } catch (error) {
    console.error('Error syncing offline data:', error);
  }
};

const processOfflineAction = async (action: {
  type: string;
  path: string;
  data: any;
}) => {
  try {
    switch (action.type) {
      case 'create':
        await setDoc(doc(collection(db, action.path)), action.data);
        break;
      case 'update':
        await setDoc(doc(db, action.path), action.data, { merge: true });
        break;
      // Add more cases as needed
    }
  } catch (error) {
    console.error('Error processing offline action:', error);
    throw error;
  }
};