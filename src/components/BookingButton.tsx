import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

interface BookingButtonProps {
  text: string;
  phone: string;
  className: string;
  tooltipClass: string;
}

const BookingButton = ({
  text,
  phone,
  className,
  tooltipClass,
}: BookingButtonProps): ReactElement => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? (
    <a
      href={`tel:${phone}`}
      className={className}
    >
      {text}
    </a>
  ) : (
    <button
      className={`${className} ${tooltipClass}`}
      data-tooltip="call to book"
      disabled
    >
      {text}
    </button>
  );
};

export default BookingButton;
