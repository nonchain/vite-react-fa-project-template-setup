import { RiGithubFill } from "@remixicon/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const skills = [
  {
    label: "HTML",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-red-500 text-white font-semibold",
  },
  {
    label: "CSS",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-purple-400 text-white font-semibold",
  },
  {
    label: "JavaScript",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-yellow-300 text-zinc-800 font-semibold",
  },
  {
    label: "React",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-blue-500 text-white font-semibold",
  },
  {
    label: "Typescript",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-purple-700 text-white font-semibold",
  },
  {
    label: "Clean Code",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-lime-600 text-white font-semibold",
  },
  {
    label: "Nextjs",
    style: "rounded flex items-center justify-center py-0.5 px-2 bg-zinc-900 text-white font-semibold",
  },
];

function AboutMePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p>درباره من</p>
      </PopoverTrigger>

      <PopoverContent align="start" sideOffset={12} className="flex flex-col gap-6">
        <div className="flex gap-3">
          <Avatar className="size-12">
            <AvatarImage src="https://avatars.githubusercontent.com/u/51164107?v=4" />
            <AvatarFallback>NO</AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-[15px] font-bold text-zinc-800">علی آهنگری</p>
              <p className="text-[13px] font-medium text-zinc-400">Front End Developer</p>
            </div>

            <a href="https://github.com/nonchain" target="_blank" rel="noopener noreferrer">
              <RiGithubFill />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1.5" dir="ltr">
          <p className="text-[13px] font-semibold">Skills</p>
          <div className="flex flex-wrap w-full gap-2">
            {skills.map((skill) => (
              <p className={skill.style}>{skill.label}</p>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AboutMePopover;
