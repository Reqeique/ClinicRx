import { PageHeader } from '@/components/page-header';
import { InventoryCopilotClientPage } from './client-page';

export default function InventoryCopilotPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Smart Inventory Copilot"
        description="Let AI analyze your medicine shelf from a photo to reconcile your stock."
      />
      <InventoryCopilotClientPage />
    </div>
  );
}
