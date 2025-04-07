import { ServiceCard } from "@/components/Services";
import { addresses } from "@/constants/addresses";
import React from "react";

const AddressSection = () => {
  return (
    <section className=" py-8">
      <div className="container mx-auto px-2 pt-4  text-black">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {addresses.map((address) => (
            <div key={address.id}>
              <ServiceCard service={address} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
