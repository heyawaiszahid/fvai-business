"use client";

import ConfettiDesktop3 from "@/Components/Icons/ConfettiDesktop3";
import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import { useState } from "react";

const ENTITIES = [
  { id: "mainTarget", name: "Main Target Entity", price: 2000 },
  { id: "partial1", name: "Significant Partial Entity 1", price: 1000 },
  { id: "partial2", name: "Significant Partial Entity 2", price: 2000 },
  { id: "partial3", name: "Significant Partial Entity 3", price: 3000 },
];

const EntitySelection = ({ className }) => {
  const [selectedEntities, setSelectedEntities] = useState({
    mainTarget: true,
    partial1: false,
    partial2: false,
    partial3: false,
  });

  const toggleEntity = (entity) => {
    setSelectedEntities((prev) => ({
      ...prev,
      [entity]: !prev[entity],
    }));
  };

  const totalFee = ENTITIES.reduce((sum, { id, price }) => sum + (selectedEntities[id] ? price : 0), 0);

  return (
    <section className="mb-10">
      <div className="container lg:max-w-[1060px] flex flex-col gap-6 relative">
        <ConfettiDesktop3 className="absolute left-0 top-[20px] scale-x-[-1] hidden lg:block z-[-1]" />
        <ConfettiDesktop3 className="absolute right-[20px] top-[20px] hidden lg:block z-[-1]" />
        <Typography size="h4" lg="h3" className="text-center max-w-80 lg:max-w-full mx-auto">
          Select the Entities to Include in the Valuation Scope
        </Typography>
        <Typography size="body2" className="text-center lg:mb-2">
          Please select the entities below that you'd like us to include in your valuation report.
        </Typography>
        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          {ENTITIES.map(({ id, name }) => (
            <Button key={id} variant={selectedEntities[id] ? "default" : "light"} onClick={() => toggleEntity(id)}>
              {name}
            </Button>
          ))}
        </div>
        <Box p="6" className="!bg-dark text-white lg:w-full lg:max-w-[880px] lg:mx-auto lg:flex-row lg:items-center">
          <div>
            <Typography size="h4" lg="h3" className="border-b-[1px] lg:border-b-0 pb-6 mb-6 lg:pb-0 lg:mb-0">
              Fee <br /> Summary
            </Typography>
          </div>
          <div className="lg:flex-1 lg:border-l-[1px] lg:ml-20 lg:pl-16 border-input-field lg:pt-2">
            <div className="flex flex-col gap-2">
              {ENTITIES.map(
                ({ id, name, price }) =>
                  selectedEntities[id] && (
                    <div key={id} className="flex justify-between">
                      <Typography size="body2" lg="h5" className="font-bold">
                        {name}
                      </Typography>
                      <Typography size="body2" lg="h5" className="font-bold">
                        ${price.toLocaleString()}
                      </Typography>
                    </div>
                  )
              )}
              <div className="flex justify-between mt-10 lg:mt-6">
                <Typography size="body2" lg="h5" className="font-bold text-light-blue">
                  Total Fee
                </Typography>
                <Typography size="body2" lg="h5" className="font-bold text-light-blue">
                  ${totalFee.toLocaleString()}
                </Typography>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default EntitySelection;
