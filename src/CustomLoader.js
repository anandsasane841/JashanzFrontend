import React, { useState, useEffect } from 'react';
import './CustomLoader.css'; // Import your CSS file

function CustomLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="centered-container">
      {isLoading ? (
        <div className="loader">
          <img
            className="image"
            src="https://res.cloudinary.com/dvqxcqg2n/image/upload/v1699425006/icdhtflmuxuqafm5wxht.png"
            alt="logo-loader"
          />
        </div>
      ) : null}
    </div>
  );
}

export default CustomLoader;
