import { createStore, createEffect, createEvent } from 'effector';
import axios from 'axios';

const API_ENDPOINT ="https://myfailemtions.npkn.net/b944ff/";

// Create an effect for fetching data
export const initializePositions = createEffect<void, string[], Error>();
// Define the GET request
initializePositions.use(async () => {
    try {
      const response = await axios.get<Promise<string[]>>(API_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
});
// Log errors
initializePositions.fail.watch((error) => {
  console.error('Error fetching data:', error);
});



// Create an effect for posting data
export const setPosition = createEffect<any, void, Error>();
// Define the POST request
setPosition.use(async (positions: string[]) => {
    try {
      await axios.post<string[]>(API_ENDPOINT, positions)
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
});

// Create a store to hold the fetched data
export const store = createStore<string[] | null>(null);

//Create event for updating active positions
export const updateActivePositions = createEvent<string[]>();

//Attach trigered data to store
store.on(updateActivePositions, (_, updatedData) =>  updatedData );
store.on(setPosition.done, (_, result) => result.params);
store.on(initializePositions.doneData, (_, data) => data);


