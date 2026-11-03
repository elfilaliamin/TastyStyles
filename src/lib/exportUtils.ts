import { DesignStateSchema, type DesignState } from '../config/schema';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/markdown'): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportJsonState(state: DesignState): void {
  const json = JSON.stringify(state, null, 2);
  downloadFile(json, 'tastystyles-state.json', 'application/json');
}

export function parseImportedJson(jsonString: string): { success: true; state: DesignState } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonString);
    const result = DesignStateSchema.safeParse(parsed);
    if (!result.success) {
      const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      return { success: false, error: `Invalid design state: ${messages}` };
    }
    return { success: true, state: result.data };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON file.' };
  }
}

