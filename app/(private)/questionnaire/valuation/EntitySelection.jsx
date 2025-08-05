"use client";

import ConfettiDesktop3 from "@/Components/Icons/ConfettiDesktop3";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EntitySelection = ({ id, price, answers, selectedEntities }) => {
  const { "10.2.1": count = 0 } = JSON.parse(answers);
  const [selected, setSelected] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const entities = [
    { id: "mainTarget", name: "Main Target Entity", price: price.main },
    ...Array(Number(count) || 0)
      .fill()
      .map((_, i) => ({
        id: `partial${i + 1}`,
        name: `Significant Partial Entity ${i + 1}`,
        price: price.partial,
      })),
  ];

  useEffect(() => {
    if (entities.length > 0 && !isInitialized) {
      const initialSelection = selectedEntities
        ? JSON.parse(selectedEntities)
        : {
            mainTarget: true,
            ...Object.fromEntries(entities.slice(1).map((e) => [e.id, false])),
          };

      setSelected(initialSelection);
      setIsInitialized(true);

      if (!selectedEntities) {
        updateSelectedEntities(initialSelection);
      }
    }
  }, [entities, selectedEntities, isInitialized]);

  const updateSelectedEntities = async (newSelection) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/questionnaire/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedEntities: newSelection,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save selection");
      }
    } catch (error) {
      toast.error("Error saving selected entities.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEntity = async (id) => {
    const newSelected = { ...selected, [id]: !selected[id] };
    setSelected(newSelected);
    await updateSelectedEntities(newSelected);
  };

  const totalFee = entities.reduce((sum, e) => sum + (selected[e.id] ? e.price : 0), 0);

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-[275px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

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
            <Button
              key={id}
              variant={selected[id] ? "default" : "light"}
              onClick={() => toggleEntity(id)}
              disabled={isSaving}
            >
              {name}
            </Button>
          ))}
        </div>

        <Box p="6" className="!bg-dark text-white lg:w-full lg:max-w-[880px] lg:mx-auto lg:flex-row lg:items-center">
          <Typography size="h4" lg="h3">
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
