import type { Activity } from '$lib/features/activity/types';
import { createDate } from '$lib/utils/date-time/createDate';

const TIME_REGEX = /\b(\d{1,2}:\d{2}\s*(?:AM|PM)?)\b/gi;

const RANGE_REGEX = /(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s*-\s*(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;

type ParsedActivity = {
  activity: Activity;
  start: ReturnType<typeof createDate> | null;
  end: ReturnType<typeof createDate> | null;
};

function parseTimeOnToday(time: string) {
  const today = createDate().format('YYYY-MM-DD');

  const hasAmPm = /(?:AM|PM)$/i.test(time.trim());

  const format = hasAmPm ? 'YYYY-MM-DD h:mm A' : 'YYYY-MM-DD HH:mm';

  const result = createDate(`${today} ${time.trim()}`, format);

  return result.isValid() ? result : null;
}

function parseActivity(activity: Activity): ParsedActivity {
  const text = activity.description;

  // Check for a time range first
  const rangeMatch = text.match(RANGE_REGEX);

  if (rangeMatch) {
    return {
      activity,
      start: parseTimeOnToday(rangeMatch[1]),
      end: parseTimeOnToday(rangeMatch[2]),
    };
  }

  // Otherwise check for a single time
  const timeMatch = text.match(TIME_REGEX);

  if (timeMatch) {
    return {
      activity,
      start: parseTimeOnToday(timeMatch[0]),
      end: null,
    };
  }

  return {
    activity,
    start: null,
    end: null,
  };
}

export function trackGroupItems(
  activities: Activity[],
  currentTime: string,
  graceMinutes = 20,
): Activity[] {
  const now = parseTimeOnToday(currentTime);

  if (!now) {
    throw new Error(`Invalid current time: ${currentTime}`);
  }

  const parsed = activities.map(parseActivity);

  // ----------------------------------------
  // PASS 1: Exact / range matching
  // ----------------------------------------

  const strictMatches = parsed.filter((entry) => {
    if (!entry.start) {
      return false;
    }

    // Range:
    // 8:00 PM - 9:00 PM
    if (entry.end) {
      return now.isSameOrAfter(entry.start) && now.isSameOrBefore(entry.end);
    }

    // Single time:
    // 8:00 PM
    return now.isSame(entry.start, 'minute');
  });

  if (strictMatches.length > 0) {
    return strictMatches.map((entry) => entry.activity);
  }

  // ----------------------------------------
  // PASS 2: Grace period
  // Only applies to single-time activities.
  // ----------------------------------------

  return parsed
    .filter((entry) => {
      if (!entry.start || entry.end) {
        return false;
      }

      const minutesAfterStart = now.diff(entry.start, 'minute');

      return minutesAfterStart > 0 && minutesAfterStart <= graceMinutes;
    })
    .map((entry) => entry.activity);
}
