import { FormCheckbox } from "./Forms/FormCheckbox";

const FORM_TITLE = "DATA SECURITY POLICIES";
const FORM_CHECKBOXES = [
  { id: "hipaa", label: "HIPAA (Default)", checked: false },
  { id: "data-retention-30", label: "Data Retention 30 Days", checked: false },
];

const DataSecurityPolicies = () => {
  return <FormCheckbox title={FORM_TITLE} checkboxes={FORM_CHECKBOXES} />;
};

export { DataSecurityPolicies };
