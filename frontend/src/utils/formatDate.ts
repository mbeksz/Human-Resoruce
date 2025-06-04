import { format, formatDistance, parseISO } from 'date-fns';

/**
 * Format date to a human-readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy'); // ✅ 04.06.2025 gibi yazacak
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format date as relative time (e.g., "2 days ago")
 */
export const formatRelativeDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return dateString;
  }
};