import {useEditorStore} from "@/store/use-editor-store";
import {ColorResult, SketchPicker} from "react-color";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {HighlighterIcon} from "lucide-react";

const HighLightColorButton = () => {

  const {editor} = useEditorStore()

  const value = editor?.getAttributes("highlight").color || "#fff"


  const onSelectColor = (color : ColorResult) => {
    editor?.chain().focus().setHighlight({color : color.hex}).run()
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button

          className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
          <HighlighterIcon className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"p-2.5"}>
        <SketchPicker color={value} onChange={onSelectColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default HighLightColorButton