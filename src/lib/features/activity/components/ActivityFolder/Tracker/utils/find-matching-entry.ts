import { createDate } from '$lib/utils/date-time/createDate';

type ParsedEntry = {
  id: string;
  text: string;
  start: ReturnType<typeof createDate> | null;
  end: ReturnType<typeof createDate> | null;
};

type FlaggedEntry = {
  id: string;
  text: string;
  flagged: boolean;
};

type Entry = {
  id: string;
  content: string;
};

const TIME_REGEX = /\b(\d{1,2}:\d{2}\s*(?:AM|PM)?)\b/gi;

const RANGE_REGEX = /(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s*-\s*(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;

function parseTimeOnToday(time: string) {
  const today = createDate().format('YYYY-MM-DD');

  const hasAmPm = /(?:AM|PM)$/i.test(time.trim());

  const format = hasAmPm ? 'YYYY-MM-DD h:mm A' : 'YYYY-MM-DD HH:mm';

  const result = createDate(`${today} ${time.trim()}`, format);

  return result.isValid() ? result : null;
}

function parseEntry(entry: Entry): ParsedEntry {
  const { id, content: text } = entry;

  // Check for a time range first
  const rangeMatch = text.match(RANGE_REGEX);

  if (rangeMatch) {
    return {
      id,
      text,
      start: parseTimeOnToday(rangeMatch[1]),
      end: parseTimeOnToday(rangeMatch[2]),
    };
  }

  // Otherwise check for a single time
  const timeMatch = text.match(TIME_REGEX);

  if (timeMatch) {
    return {
      id,
      text,
      start: parseTimeOnToday(timeMatch[0]),
      end: null,
    };
  }

  return {
    id,
    text,
    start: null,
    end: null,
  };
}

export function flagMatchingEntries(
  entries: Entry[],
  currentTime: string,
  graceMinutes = 20,
): FlaggedEntry[] {
  const now = parseTimeOnToday(currentTime);

  if (!now) {
    throw new Error(`Invalid current time: ${currentTime}`);
  }

  const parsed = entries.map(parseEntry);

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
    const matched = new Set(strictMatches);

    return parsed.map((entry) => ({
      id: entry.id.split('.').pop() ?? entry.id,
      text: entry.text,
      flagged: matched.has(entry),
    }));
  }

  // ----------------------------------------
  // PASS 2: Grace period
  // Only applies to single-time entries.
  // ----------------------------------------

  return parsed.map((entry) => {
    if (!entry.start || entry.end) {
      return {
        id: entry.id.split('.').pop() ?? entry.id,
        text: entry.text,
        flagged: false,
      };
    }

    const minutesAfterStart = now.diff(entry.start, 'minute');

    return {
      id: entry.id.split('.').pop() ?? entry.id,
      text: entry.text,
      flagged: minutesAfterStart > 0 && minutesAfterStart <= graceMinutes,
    };
  });
}
