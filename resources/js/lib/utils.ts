import { GradeResult } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const em = (e: { [key: string]: string }) => {
  return Object.entries(e)
    .map(([, v]) => v)
    .join(', ');
};

export function strLimit(text: string = '', limit: number = 50, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}

export function dateDFY(date?: string | Date) {
  return date ? dayjs(date).format('DD MMMM YYYY') : '-';
}

export function dateDFYHIS(date?: string | Date) {
  return date ? dayjs(date).format('DD MMMM YYYY HH:mm') : '-';
}

export function handlePasteScreenshot(callback: (file: File) => void) {
  const onPaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image')) {
        const file = item.getAsFile();
        if (file) {
          callback(file);
        }
      }
    }
  };

  window.addEventListener('paste', onPaste);
  return () => window.removeEventListener('paste', onPaste); // biar bisa cleanup
}

export function copyMarkdownImage(alt: string, url: string) {
  const markdown = `![${alt}](${url})`;

  navigator.clipboard
    .writeText(markdown)
    .then(() => toast.success(`${alt} copied to clipboard`))
    .catch((err) => toast.error('Gagal copy:', err));
}

export function copyToClipboard(text: string, successMessage?: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success(successMessage ?? `${text} copied to clipboard`))
    .catch((err) => toast.error('Gagal copy:', err));
}

export function getGradeWithComment(score: number): GradeResult {
  let grade = 'F';
  let comment = 'Tidak Lulus';
  let passed = false;
  let emoticon = '😭';

  if (score >= 90) {
    grade = 'A+';
    comment = 'Sangat Istimewa';
    passed = true;
    emoticon = '☺️';
  } else if (score >= 85) {
    grade = 'A';
    comment = 'Sangat Baik';
    passed = true;
    emoticon = '😊';
  } else if (score >= 80) {
    grade = 'A-';
    comment = 'Sangat Baik';
    passed = true;
    emoticon = '😊';
  } else if (score >= 75) {
    grade = 'B+';
    comment = 'Baik';
    passed = true;
    emoticon = '👍';
  } else if (score >= 70) {
    grade = 'B';
    comment = 'Baik';
    passed = true;
    emoticon = '👍';
  } else if (score >= 65) {
    grade = 'B-';
    comment = 'Cukup Baik';
    passed = true;
    emoticon = '👍';
  } else if (score >= 60) {
    grade = 'C+';
    comment = 'Perlu Peningkatan';
    passed = true;
    emoticon = '🤌';
  } else if (score >= 50) {
    grade = 'C';
    comment = 'Perlu Peningkatan';
    passed = true;
    emoticon = '🤌';
  } else if (score >= 40) {
    grade = 'D';
    comment = 'Perlu Perbaikan';
    passed = false;
    emoticon = '🤌';
  } else if (score >= 30) {
    grade = 'E';
    comment = 'Sangat buruk';
    passed = false;
    emoticon = '😵';
  } else {
    grade = 'F';
    comment = 'Tidak Lulus';
    passed = false;
    emoticon = '😭';
  }

  return { grade, comment, passed, emoticon };
}

export function formatRupiah(value: number, withPrefix = true): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/^Rp/, withPrefix ? 'Rp' : '')
    .trim();
}

export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]; // biar gak mutate data asli
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]; // tukar posisi
  }
  return copy;
}

export function convertToEmbedUrl(url: string): string {
  let videoId: string | null = null;

  // Handle youtu.be short URL
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortUrlMatch) {
    videoId = shortUrlMatch[1];
  }

  // Handle youtube.com/watch?v= long URL
  const longUrlMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (longUrlMatch) {
    videoId = longUrlMatch[1];
  }

  if (!videoId) {
    throw new Error('URL YouTube tidak valid atau ID video tidak ditemukan');
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

export function paymentCode(id: number): string {
  return `#${id.toString().padStart(6, '0')}`;
}
