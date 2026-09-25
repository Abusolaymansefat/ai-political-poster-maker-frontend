"use client";

import { useState } from "react";
import TemplateCard from "@/components/templates/template-card";
import { useTemplates } from "@/app/hooks/use-templates";

const categories = [
  {
    label: "All",
    value: ""
  },
  {
    label: "বিজয় দিবস",
    value: "victory-day"
  },
  {
    label: "শোক ও স্মরণ",
    value: "condolence"
  },
  {
    label: "প্রচার",
    value: "campaign"
  },
  {
    label: "শুভেচ্ছা",
    value: "greeting"
  },
  {
    label: "ঈদ",
    value: "eid"
  }
];

export default function TemplatesPage() {
  const [category, setCategory] =
    useState("");

  const {
    data: templates = [],
    isLoading
  } = useTemplates(category);

  return (
    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Poster Templates
        </h1>

        <p className="mt-2 text-muted-foreground">
          Choose a template and start creating.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item.value}
            onClick={() =>
              setCategory(item.value)
            }
            className={`rounded-full border px-4 py-2 text-sm ${category === item.value
                ? "bg-primary text-primary-foreground"
                : "bg-background"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          Loading templates...
        </div>
      ) : templates.length === 0 ? (
        <div className="py-20 text-center">
          No templates found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map(
            (template, index) => (
              <TemplateCard
                key={template._id}
                template={template}
                priority={index === 0}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}