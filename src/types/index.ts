// Centralized type definitions for the application

export type PageType = 'home' | 'clinics' | 'services' | 'innovation' | 'guides' | 'study';

export interface BookingCallbacks {
  onBookingClick: () => void;
}

export interface PageChangeCallbacks {
  onPageChange: (page: PageType) => void;
}

// Combined interface for pages that need both callbacks
export interface PageWithBookingAndNavigation extends BookingCallbacks, PageChangeCallbacks {}
