import React from 'react';

type Props = {
  children: React.ReactNode;
};

function MainSection({ children }: Props): JSX.Element {
  return (
    <main className="flex-1 p-2 md:p-4 bg-grey overflow-y-auto h-screen no-scrollbar">
      <div className="bg-white rounded-lg shadow-md p-2 md:p-4">{children}</div>
    </main>
  );
}

export default MainSection;
