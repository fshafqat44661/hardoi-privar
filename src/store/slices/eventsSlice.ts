import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventDTO } from '@/types';

interface EventsState {
  filter: string;
  items: EventDTO[];
}

const initialState: EventsState = {
  filter: 'All',
  items: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setEvents(state, action: PayloadAction<EventDTO[]>) {
      state.items = action.payload;
    },
  },
});

export const { setEventFilter, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;

/** Derived selector helper for filtered events */
export function selectFilteredEvents(state: { events: EventsState }, limit?: number) {
  const { filter, items } = state.events;
  const list = filter === 'All' ? items : items.filter((e) => e.cat === filter);
  return limit ? list.slice(0, limit) : list;
}

export function selectEventCategories(state: { events: EventsState }) {
  return ['All', ...Array.from(new Set(state.events.items.map((e) => e.cat)))];
}
