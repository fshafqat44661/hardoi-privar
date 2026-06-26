import { createAsyncThunk } from '@reduxjs/toolkit';

export const submitMembership = createAsyncThunk(
  'forms/membership',
  async (payload: { name: string; phone: string; city: string }, { rejectWithValue }) => {
    const res = await fetch('/api/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) return rejectWithValue(json.error ?? 'Submission failed');
    return json.data;
  },
);

export const submitContact = createAsyncThunk(
  'forms/contact',
  async (
    payload: { name: string; email?: string; phone: string; topic: string; message?: string },
    { rejectWithValue },
  ) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) return rejectWithValue(json.error ?? 'Submission failed');
    return json.data;
  },
);

export const submitDonation = createAsyncThunk(
  'forms/donation',
  async (
    payload: {
      name: string;
      email?: string;
      phone: string;
      amount: number;
      purpose: string;
      message?: string;
    },
    { rejectWithValue },
  ) => {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) return rejectWithValue(json.error ?? 'Donation failed');
    return json.data;
  },
);
