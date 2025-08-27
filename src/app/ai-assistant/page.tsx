import { PageHeader } from '@/components/page-header';
import { AIClientPage } from './client-page';

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Reorder Assistant"
        description="Let our AI analyze your sales and stock to suggest what to reorder."
      />
      <AIClientPage />
    </div>
  );
}
