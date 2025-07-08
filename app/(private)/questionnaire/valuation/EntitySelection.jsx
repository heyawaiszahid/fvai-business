"use client";

import ConfettiDesktop3 from "@/Components/Icons/ConfettiDesktop3";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import { useEffect, useState } from "react";

const EntitySelection = ({ price }) => {
  const [entities, setEntities] = useState([]);
  const [selected, setSelected] = useState({ mainTarget: true });

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("answers") || "{}");
    const significantEntitiesCount = Number(answers["10.2.1"]) || 0;

    const baseEntity = { id: "mainTarget", name: "Main Target Entity", price: price.main };
    const significantEntities = Array(significantEntitiesCount)
      .fill()
      .map((_, i) => ({
        id: `partial${i + 1}`,
        name: `Significant Partial Entity ${i + 1}`,
        price: price.partial,
      }));

    setEntities([baseEntity, ...significantEntities]);
    setSelected({
      mainTarget: true,
      ...Object.fromEntries(significantEntities.map((e) => [e.id, false])),
    });
  }, []);

  const toggleEntity = (id) => setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  const totalFee = entities.reduce((sum, { id, price }) => sum + (selected[id] ? price : 0), 0);

  useEffect(() => {
    const data = {
      selected: entities.filter((e) => selected[e.id]).map((e) => e.name),
      total: totalFee,
      price: { ...price },
    };
    localStorage.setItem("entities", JSON.stringify(data));
  }, [selected, totalFee]);

  return (
    <section className="mb-10">
      <div className="container lg:max-w-[1060px] flex flex-col gap-6 relative">
        <ConfettiDesktop3 className="absolute left-0 top-[20px] scale-x-[-1] hidden lg:block z-[-1]" />
        <ConfettiDesktop3 className="absolute right-[20px] top-[20px] hidden lg:block z-[-1]" />

        <Typography size="h4" lg="h3" className="text-center max-w-80 lg:max-w-full mx-auto">
          Select the Entities to Include in the Valuation Scope
        </Typography>

        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center gap-6 mb-4">
          {entities.map(({ id, name }) => (
            <Button key={id} variant={selected[id] ? "default" : "light"} onClick={() => toggleEntity(id)}>
              {name}
            </Button>
          ))}
        </div>

        <Box p="6" className="!bg-dark text-white lg:w-full lg:max-w-[880px] lg:mx-auto lg:flex-row lg:items-center">
          <Typography size="h4" lg="h3" className="border-b-[1px] lg:border-b-0 pb-6 mb-6 lg:pb-0 lg:mb-0">
            Fee Summary
          </Typography>

          <div className="lg:flex-1 lg:border-l-[1px] lg:ml-20 lg:pl-16 border-input-field lg:pt-2">
            {entities
              .filter((e) => selected[e.id])
              .map(({ id, name, price }) => (
                <div key={id} className="flex justify-between">
                  <Typography size="body2" lg="h5" className="font-bold">
                    {name}
                  </Typography>
                  <Typography size="body2" lg="h5" className="font-bold">
                    ${price.toLocaleString()}
                  </Typography>
                </div>
              ))}

            <div className="flex justify-between mt-10 lg:mt-6">
              <Typography size="body2" lg="h5" className="font-bold text-light-blue">
                Total Fee
              </Typography>
              <Typography size="body2" lg="h5" className="font-bold text-light-blue">
                ${totalFee.toLocaleString()}
              </Typography>
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default EntitySelection;
