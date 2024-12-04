import {QueryParams} from "@/types/common";
import Editor from "@/app/documents/[documentId]/editor";
import Toolbar from "@/app/documents/[documentId]/toolbar";

interface DocumentIdPageProps extends QueryParams<{documentId : string}>{

}

const DocumentIdPage = async ({params} :DocumentIdPageProps) => {

  const {documentId} = await params


    return (
    <div className={"min-h-screen bg-[#FAFBFD]"}>
      <Toolbar />

      <Editor />

    </div>
    )
}

export default DocumentIdPage