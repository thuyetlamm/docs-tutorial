"use client"

import { type ColorResult} from "react-color"
import { SketchPicker } from 'react-color'
import {
  BoldIcon,
  ItalicIcon, ListTodoIcon,
  LucideIcon, MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon, RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from "lucide-react";
import {ButtonProps} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";
import {Separator} from "@/components/ui/separator";
import {Fragment, useMemo} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

import FontFamilyButton from "@/app/documents/[documentId]/_components/FontFamilyButton"
import HeadingLevelButton from "@/app/documents/[documentId]/_components/HeadingLevelButton"
import HighLightColorButton from "@/app/documents/[documentId]/_components/HighLightColorButton"


const TextColorButton = () => {

  const {editor} = useEditorStore()

  const value = editor?.getAttributes("textStyle").color || "#000000"


  const onSelectColor = (color : ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run()
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button

          className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
            <span className={"text-xs"}>
              A
            </span>
         <div className={"h-0.5 w-full"} style={{backgroundColor : value}}></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"p-2.5"}>
        <SketchPicker color={value} onChange={onSelectColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}






interface ToolbarIconProps extends Pick<ButtonProps, 'onClick'>{
  isActive? : boolean
  icon :  LucideIcon
}


const ToolbarIcon = ( {onClick,icon : Icon,isActive} :ToolbarIconProps) => {
  return (
    <button onClick={onClick} className={cn("text-sm h-7 min-h-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/8-")}>
      <Icon className={"size-4"}/>
    </button>
  )
}


interface ToolbarProps {

}

interface Section extends Pick<ButtonProps, 'onClick'> {
  label : string
  icon : LucideIcon
  isActive?: boolean
}

const Toolbar = ({}: ToolbarProps) => {

  const {editor} = useEditorStore()


  const sections : Section[][] = useMemo(() => {

    return [
      [
        {
          label : "Undo",
          icon : Undo2Icon,
          onClick : () => editor?.chain().focus().undo().run()

        },
        {
          label : "Redo",
          icon : Redo2Icon,
          onClick : () => editor?.chain().focus().redo().run()
        },
        {
          label : "Print",
          icon : PrinterIcon,
          onClick : () => window.print()
        },
        {
          label : "Spell Check",
          icon : SpellCheckIcon,
          onClick : () => {
            if(!editor) return
            const viewDom = editor.view.dom
            const current = viewDom.getAttribute("spellCheck")
            viewDom.setAttribute("spellCheck",current === "false" ? "true" : "false")
          }
        }
      ],
      //Text Style
      [
        {
          label : "Bold",
          icon : BoldIcon,
          isActive : editor?.isActive("bold"),
          onClick : () => editor?.chain().focus().toggleBold().run()
        },
        {
          label : "Italic",
          icon : ItalicIcon,
          isActive : editor?.isActive("italic"),
          onClick : () => editor?.chain().focus().toggleItalic().run()
        },
        {
          label : "Underline",
          icon : UnderlineIcon,
          isActive : editor?.isActive("underline"),
          onClick : () => editor?.chain().focus().toggleUnderline().run()
        }
      ],
      [
        {
          label : "Comment",
          icon : MessageSquarePlusIcon,
          isActive : false,
          onClick : () => editor?.chain().focus().toggleUnderline().run()
        },
        {
          label : "List Todo",
          icon : ListTodoIcon,
          isActive : editor?.isActive("TaskList"),
          onClick : () => editor?.chain().focus().toggleTaskList().run()
        },
        {
          label : "Remove Formatting",
          icon : RemoveFormattingIcon,
          isActive : editor?.isActive("TaskList"),
          onClick : () => editor?.chain().focus().unsetAllMarks().run()
        },
      ],
      //Font Family
      [
        {
          label : "Remove Formatting",
          icon : RemoveFormattingIcon,
          isActive : editor?.isActive("TaskList"),
          onClick : () => editor?.chain().focus().unsetAllMarks().run()
        }
      ]
    ]
  },[editor])

  const renderToolbarSection = (section : Section[]) => {
    return section.map((item) => (
        <ToolbarIcon icon={item.icon} key={item.label} isActive={item.isActive} onClick={item.onClick} />
    ))
  }
  return (
      <div className={"bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto"}>
        <div className={"flex gap-4 items-center"}>
          {sections.map((item,index) => (
            <Fragment key={index} >
              {renderToolbarSection(item)}
              {index !== sections.length - 1 && (
                <Separator  orientation={"vertical"} className={"h-4 bg-neutral-300"} />

              )}
            </Fragment>
          ))
          }
          <FontFamilyButton />
          <HeadingLevelButton />
          <TextColorButton />
          <HighLightColorButton />
        </div>

      </div>
)
}

export default Toolbar