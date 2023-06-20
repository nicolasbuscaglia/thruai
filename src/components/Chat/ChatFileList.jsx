import { useSelector } from "react-redux";
import { FileList } from "../File/FileList";
import { selectCleanedFilesById } from "@/redux/features/cases/filesSlice";
import { useParams } from "next/navigation";

const ChatFileList = () => {
  const params = useParams();
  const { id } = params;
  const files = useSelector(selectCleanedFilesById(id));
  return <FileList files={files} />;
};

export { ChatFileList };
