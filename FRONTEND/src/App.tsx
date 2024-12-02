// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import CreateCampaign from './pages/CreateCampaign';
// import ActiveCampaigns from './pages/ActiveCampaigns';
// import CampaignHistory from './pages/CampaignHistory';
// import Analytics from './pages/Analytics';
// import Settings from './pages/Settings';
// import Test from './pages/Test';
// import UserWalletConnect from './pages/UserWalletConnect';

// import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
// import { getFullnodeUrl } from '@mysten/sui/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '@mysten/dapp-kit/dist/index.css';

// const queryClient = new QueryClient();

// const { networkConfig } = createNetworkConfig({
//   devnet: { url: getFullnodeUrl('devnet') },
//   testnet: { url: getFullnodeUrl('testnet') },
//   mainnet: { url: getFullnodeUrl('mainnet') },
// });


// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
//         <WalletProvider>
//           <Router>
//             <div className="min-h-screen bg-gray-50">
//               <Navbar onMenuClick={toggleSidebar} />
//               <Sidebar isOpen={isSidebarOpen} />
//               <div className={`transition-all duration-200 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}>
//                 <main className="p-6">
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/create" element={<CreateCampaign />} />
//                     <Route path="/campaigns" element={<ActiveCampaigns />} />
//                     <Route path="/history" element={<CampaignHistory />} />
//                     <Route path="/analytics" element={<Analytics />} />
//                     <Route path="/settings" element={<Settings />} />
//                     <Route path="/test" element={<Test />} />
//                     <Route path="/suiconnect" element={<UserWalletConnect />} />
//                   </Routes>
//                 </main>
//               </div>
//             </div>
//           </Router>
//         </WalletProvider>
//       </SuiClientProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import ActiveCampaigns from './pages/ActiveCampaigns';
import CampaignHistory from './pages/CampaignHistory';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Test from './pages/Success';
import UserWalletConnect from './pages/UserWalletConnect';
import AdminData from './pages/AdminData';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`transition-all duration-200 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/success" element={<Test />} />
              <Route path="/suiconnect" element={<UserWalletConnect />} />
              <Route path="/admin" element={<AdminData />} />
              <Route
                path="/*"
                element={
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/create" element={<CreateCampaign />} />
                      <Route path="/campaigns" element={<ActiveCampaigns />} />
                      <Route path="/history" element={<CampaignHistory />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </MainLayout>
                }
              />
            </Routes>
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;