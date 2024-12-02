// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from 'react';

// interface FloatingElementProps {
//   imageUrl: string;
//   title: string;
//   description: string;
//   link: string;
// }

// const FloatingElement: React.FC<FloatingElementProps> = ({
//   imageUrl,
//   title,
//   description,
//   link,
// }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   const handleClick = () => {
//     window.open(link, '_blank'); // Open the link in a new tab
//   };

//   return (
//     isVisible && (
//       <div
//         className="fixed bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer"
//         style={{ marginRight: '30px', marginBottom: '30px' }}
//         onClick={handleClick}
//       >
//         <img
//           src="https://img.pikbest.com/templates/20241024/digital-marketing-agency-social-media-instagram-post-promotion-square-banner-template_10997575.jpg!f305cw"
//           alt="Floating Element"
//           className="w-12 h-12 rounded-full object-cover"
//         />
//         <div className="text-sm">
//           <p className="font-semibold text-gray-800">Ad title here</p>
//           <p className="text-gray-600">Ad title description long long</p>
          
//         </div>
//       </div>
//     )
//   );
// };

// export default FloatingElement;
