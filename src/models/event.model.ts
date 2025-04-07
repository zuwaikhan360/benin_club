import { Document, models, model, Schema } from 'mongoose';

export interface IEvent {
  name: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  image: string;
}

export type EventDocument = IEvent & Document;

const eventSchema = new Schema<EventDocument>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = models.Event || model<EventDocument>('Event', eventSchema);

export default Event;
