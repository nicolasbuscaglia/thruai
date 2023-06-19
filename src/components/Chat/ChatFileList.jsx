import { FileList } from "../File/FileList";

const FILES = [
  {
    id: 1,
    name: "Project Overview",
    type: ".doc",
    size: "146.5 Kb",
  },
  {
    id: 2,
    name: "What's Bons...",
    type: ".mov",
    size: "50.3 Mb",
  },
  {
    id: 3,
    name: "Testimonial",
    type: ".opus",
    size: "32.6 Mb",
  },
];

const ChatFileList = () => {
  return <FileList data={FILES} />;
};

export { ChatFileList };
