import mongoose from 'mongoose';
import { WeekDays } from '@monorepo/shared';

const TimeRangeSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

export const AvailabilitySchema = new mongoose.Schema({
  days_of_week: [{ type: String, enum: Object.values(WeekDays) }],
  time_range: [TimeRangeSchema,
});
