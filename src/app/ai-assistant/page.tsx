import { PageHeader } from '@/components/page-header';
import { AIClientPage } from './client-page';
import { inventoryData, salesData } from '@/lib/data';

export default function AIAssistantPage() {
  const salesReport = JSON.stringify(salesData, null, 2);
  const stockReport = JSON.stringify(inventoryData, null, 2);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Reorder Assistant"
        description="Let our AI analyze your sales and stock to suggest what to reorder."
      />
      <AIClientPage salesReportData={salesReport} stockReportData={stockReport} />
    </div>
  );
}
