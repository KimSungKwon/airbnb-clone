'use client';

interface ContainerProps {
  children: React.ReactNode;
}
// 화면크기에 따른 크기 조절
const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
   );
}
 
export default Container;