'use client'
// import SchedulerComponent from '@/app/components/SchedulerComponent';
import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
const SchedulerComponent = dynamic(() => import('@/app/components/SchedulerComponent'), {
  ssr: false, // Disable server-side rendering
});
export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Now it's safe to access the window object
      setWindowWidth(window.innerWidth);

      // Optional: Add an event listener for resizing
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <div className="h-screen flex flex-col">
     
     <div className="h-screen flex flex-row">
      <div className="w-3/5">
        
      </div>
      <div className="flex-1 bg-gray-100 p-8">
       
      </div>
     </div>
      

      {/* Bottom 50%: Calendar Component */}
      <div className="flex-1 bg-white p-8">
        <main>
          <SchedulerComponent />
        </main>
      </div>
    </div>
  );
}
