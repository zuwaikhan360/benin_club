import { buttonStyle } from '@/constants/styles';
import { IEvent } from '@/models/event.model';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import Loading from '../Loading';
import { compressImageUpload } from '@/utils/compressImage';

interface EventFormProps {
  id?: string;
  onClose: () => void;
}
const EventForm: React.FC<EventFormProps> = ({ id, onClose }) => {
  const [event, setEvent] = useState<IEvent>({
    name: '',
    date: new Date(),
    time: '',
    location: '',
    description: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load saved form data from database when the component mounts
    const fetchSavedData = async () => {
      if (!id) return;
      setIsLoading(true);
      const response = await fetch(`/api/dashboard/events/${id}`);
      if (response.ok) {
        const savedData = await response.json();
        console.log('savedData', savedData);
        setEvent((prev) => ({ ...prev, ...savedData }));
      }
      setIsLoading(false);
    };
    fetchSavedData();
  }, [id]);

  const onSubmit = async (event: IEvent) => {
    try {
      setLoading(true);
      // Make a POST request to the server to create the event
      const response = await fetch(`/api/dashboard/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      onClose();
      setEvent({
        name: '',
        date: new Date(),
        time: '',
        location: '',
        description: '',
        image: '',
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event: IEvent) => {
    try {
      setLoading(true);
      // Make a POST request to the server to create the event
      const response = await fetch(`/api/dashboard/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      onClose();
      setEvent({
        name: '',
        date: new Date(),
        time: '',
        location: '',
        description: '',
        image: '',
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === 'image' &&
      e.target instanceof HTMLInputElement &&
      e.target?.files
    ) {
      const file = e.target?.files[0];

      const compressImage = await compressImageUpload(file, 1024);
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: compressImage as unknown as string,
      }));
    } else {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }

    // clear the error message for the input field when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!event.name.trim()) {
      newErrors.name = 'Please enter an event name';
    }

    if (!event.date) {
      newErrors.date = 'Please enter a valid event date';
    }

    if (!event.image) {
      newErrors.image = 'Please select an event image';
    }

    if (!event.time.trim()) {
      newErrors.time = 'Please enter an event time';
    }

    if (!event.location.trim()) {
      newErrors.location = 'Please enter an event location';
    }

    if (!event.description.trim()) {
      newErrors.description = 'Please enter an event description';
    }

    if (Object.keys(newErrors).length > 0) {
      // update the error messages for the input fields
      setErrors(newErrors);
      return;
    }

    id ? handleUpdate(event) : onSubmit(event);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="py-4">
      <div className="flex md:flex-row gap-4 ">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">Add</h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
          event
        </h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.name && 'border-red border'
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="Event Name"
              value={event.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.date && 'border-red'
              }`}
              id="date"
              name="date"
              type="date"
              value={moment(event.date).format('YYYY-MM-DD')}
              onChange={(e) =>
                setEvent((prevEvent) => ({
                  ...prevEvent,
                  date: new Date(e.target.value),
                }))
              }
            />
            {errors.date && (
              <p className="text-red text-xs italic">{errors.date}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.time && 'border-red border'
              }`}
              id="time"
              name="time"
              type="time"
              value={event.time}
              onChange={handleChange}
            />
            {errors.time && (
              <p className="text-red text-xs italic">{errors.time}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.location && 'border-red border'
              }`}
              id="location"
              name="location"
              type="text"
              placeholder="Event Location"
              value={event.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p className="text-red text-xs italic">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.description && 'border-red border'
              }`}
              id="description"
              name="description"
              placeholder="Event Description"
              value={event.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red text-xs italic">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <div className="relative">
              <input
                className="sr-only"
                id="image"
                name="image"
                type="file"
                onChange={handleChange}
              />
              <div className="h-48 w-full border-dashed border-2 border-gray-300">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={`Preview of ${event.name} event`}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center h-full text-gray-400"
                  >
                    <p className="mb-2">
                      <FiUpload className="h-8 w-8" />
                    </p>
                    <p className="text-sm">Upload a preview image</p>
                  </label>
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-white rounded-md">
                <label
                  htmlFor="image"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <FiUpload className="h-6 w-6 mr-2" />
                  Change
                </label>
              </div>
            </div>
            {errors.image && (
              <p className="text-red text-xs italic">{errors.image}</p>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-end">
        {loading && (
          <div className="mr-8">
            <Loading />
          </div>
        )}
        <button className={buttonStyle} type="submit">
          {id ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
