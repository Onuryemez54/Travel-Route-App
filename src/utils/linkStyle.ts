export const linkStyle = ({ isActive }: { isActive: boolean }) =>
  ` relative inline-block px-1  transition-all duration-400
    after:content-['']  after:block after:h-[2px] after:bg-green-400 after:scale-x-0 after:transition-w after:duration-400 after:origin-center 
    hover:after:scale-x-100 
    ${isActive ? "text-green-400  after:scale-x-100" : "text-stone-200 "}`;
