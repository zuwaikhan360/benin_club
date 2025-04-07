import { Service } from '@/types/services';

interface ServiceCardProps {
  service: Service;
}
export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div
      className="bg-red-500 hover:bg-red hover:text-white cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-center items-center p-6"
      key={service.id}
    >
      <div className="bg-red rounded-full p-3">
        <service.icon className="text-white text-3xl" />
      </div>
      <h2 className="text-lg font-bold mt-4 mb-2 uppercase">{service.title}</h2>
      <p className="leading-relaxed mb-4 text-center">{service.description}</p>
    </div>
  );
};
