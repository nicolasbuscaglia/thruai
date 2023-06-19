import { FormSelect } from "./Forms/FormSelect";

const FORM_SELECT_ITEMS = [
  {
    id: 1,
    label: "OpenAI ChatGPT 3.5 (Default)",
  },
  { id: 2, label: "OpenAI ChatGPT 4" },
];

const ModelSelection = () => {
  return <FormSelect label="MODEL SELECTION" items={FORM_SELECT_ITEMS} />;
};

export { ModelSelection };
