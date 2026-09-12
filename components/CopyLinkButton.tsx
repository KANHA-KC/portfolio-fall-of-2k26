'use client';

import React from 'react';
import { useToast } from './Toast';
import LiquidSecondaryButton from '@/components/ui/liquid-button';

interface CopyLinkButtonProps {
  label?: string;
  toastMessage?: string;
  style?: React.CSSProperties;
}

export default function CopyLinkButton({
  label = 'Copy Link',
  toastMessage = 'Link copied to clipboard!',
  style,
}: CopyLinkButtonProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(toastMessage);
    } catch {
      showToast('Copied: ' + window.location.href);
    }
  };

  return (
    <LiquidSecondaryButton
      type="button"
      onClick={handleCopy}
      style={{ padding: '6px 14px', fontSize: '0.78rem', ...style }}
    >
      {label}
    </LiquidSecondaryButton>
  );
}
