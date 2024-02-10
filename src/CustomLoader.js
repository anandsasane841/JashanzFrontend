import React, { useState, useEffect } from 'react';
import './CustomLoader.css'
function CustomLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="flex-center">
      {isLoading ? (
        <div className="text-center">
          
          {/* Animated logo image */}
          <img
            className="custom-image"
            src="https://jashanzprimary.s3.ap-south-1.amazonaws.com/JashanzLogo.png"
            alt="logo-loader"
          />
        </div>
      ) : null}
    </div>
  );
}

export default CustomLoader;
