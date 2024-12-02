import React, { useState, useEffect } from 'react';
import { BadgeCheck } from 'lucide-react';
import Confetti from 'react-confetti';

const Success = () => {
  const [windowDimension, setWindowDimension] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  const detectSize = () => {
    setWindowDimension({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    
    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      fontFamily: 'Arial, sans-serif',
      position: 'relative', // Important for confetti positioning
    }}>
      {/* Confetti Component */}
      <Confetti 
        width={windowDimension.width}
        height={windowDimension.height}
        numberOfPieces={400}
        recycle={false}
        run={true}
      />

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,123,255,0.1)',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        position: 'relative', 
        zIndex: 10
      }}>
        <div style={{
          borderRadius: '50%',
          width: '250px',
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 30px',
        }}>
          <BadgeCheck
            size={150}
            color="#4F46E5"
            strokeWidth={1.5}
          />
        </div>
        <h1 style={{
          color: '#4F46E5',
          fontSize: '36px',
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          Ad Campaign Submitted
        </h1>
        <p style={{
          color: 'grey',
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          Your ad is currently under review and will be activated soon.
          Our team is carefully examining your campaign to ensure it meets
          our quality standards.
        </p>
        <div style={{
          backgroundColor: '#f0f6fd',
          borderLeft: '4px solid #4F46E5',
          padding: '15px',
          borderRadius: '5px',
          textAlign: 'left'
        }}>
          <p style={{
            color: '#4F46E5',
            fontSize: '16px',
            margin: '0'
          }}>
            ⏳ Estimated Review Time: 1-2 Business Days
          </p>
        </div>
        <br />
        <div
        onClick={() => window.location.href = '/'}
        style={{
          backgroundColor: '#4F46E5',
          borderLeft: '4px solid #4F46E5',
          padding: '15px',
          borderRadius: '5px',
          textAlign: 'left',
          cursor: 'pointer'
        }}>
          <p style={{
            color: 'white',
            fontSize: '20px',
            textAlign: 'center',
          }}>
            Close
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;