import { PageHeader } from '@/components/page-header';
import { alertsData } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, CircleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export default function AlertsPage() {
  const unreadAlerts = alertsData.filter(a => !a.read);
  const readAlerts = alertsData.filter(a => a.read);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Alerts & Notifications"
        description="Stay updated with important inventory notifications."
      />

      <div className="space-y-4">
        {unreadAlerts.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary"/>
                Unread Alerts
            </h2>
            <div className="space-y-3">
              {unreadAlerts.map(alert => (
                <Alert key={alert.id} className="border-primary/50">
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle className="flex justify-between items-center">
                    {alert.title}
                    <Badge variant="outline">{formatDistanceToNow(new Date(alert.date), { addSuffix: true })}</Badge>
                  </AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {readAlerts.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-2 text-lg font-semibold text-muted-foreground">Previously Read</h2>
            <div className="space-y-3">
              {readAlerts.map(alert => (
                <Alert key={alert.id}>
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle className="flex justify-between items-center text-muted-foreground">
                    {alert.title}
                     <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(alert.date), { addSuffix: true })}</span>
                  </AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
