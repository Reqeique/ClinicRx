'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, FileUp, Loader2, Bot, Sparkles, AlertCircle, FileCheck2 } from 'lucide-react';
import { inventoryData } from '@/lib/data';
import { analyzeShelfAction } from './actions';
import type { AnalyzeShelfOutput } from '@/ai/flows/inventory-copilot';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function InventoryCopilotClientPage() {
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<AnalyzeShelfOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCamera) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          setHasCameraPermission(false);
          setShowCamera(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      };
      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [showCamera, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoDataUri(e.target?.result as string);
        setShowCamera(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg');
      setPhotoDataUri(dataUri);
      setShowCamera(false);
    }
  };

  async function handleAnalyze() {
    if (!photoDataUri) {
      setError('Please provide a photo first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    
    const inventoryList = JSON.stringify(inventoryData.map(i => ({ name: i.name, sku: i.sku, quantity: i.quantity })));
    const result = await analyzeShelfAction({ photoDataUri, inventoryList });

    if (result.success) {
      setAnalysis(result.data);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Shelf Photo</CardTitle>
          <CardDescription>Use your camera or upload an image of your medicine shelf.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center overflow-hidden">
            {photoDataUri && !showCamera && <img src={photoDataUri} alt="Medicine Shelf" className="w-full h-full object-cover" />}
            {showCamera && <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />}
            {!photoDataUri && !showCamera && <Camera className="h-16 w-16 text-muted-foreground" />}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access in your browser to use this feature. You can still upload a file.
              </AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <div className="w-full grid grid-cols-2 gap-2">
                <Button onClick={() => setShowCamera(s => !s)} variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    {showCamera ? 'Close Camera' : 'Open Camera'}
                </Button>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Image
                </Button>
                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
             {showCamera && <Button onClick={capturePhoto} className="w-full">Capture Photo</Button>}
          <Button onClick={handleAnalyze} disabled={isLoading || !photoDataUri} className="w-full mt-2">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Analyze with AI
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex flex-col gap-6">
        {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center animate-pulse h-full">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">AI is analyzing the shelf... this may take a moment.</p>
            </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {analysis && (
            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <FileCheck2 className="h-5 w-5" />
                        AI Analysis Report
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <p className="text-sm text-foreground/80">{analysis.analysisSummary}</p>
                  </div>
                  
                  {analysis.mismatchedItems.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" /> Mismatched Items
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Medicine</TableHead>
                            <TableHead>Expected</TableHead>
                            <TableHead>Found</TableHead>
                            <TableHead>Reason</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysis.mismatchedItems.map((item, index) => (
                            <TableRow key={index} className="bg-destructive/10">
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.expectedQuantity}</TableCell>
                              <TableCell>{item.actualQuantity}</TableCell>
                              <TableCell>{item.reason}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {analysis.detectedItems.length > 0 && (
                     <div>
                      <h3 className="font-semibold mb-2">All Detected Items</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Medicine</TableHead>
                            <TableHead>Quantity Found</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysis.detectedItems.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                </CardContent>
            </Card>
        )}

        {!isLoading && !analysis && !error && (
             <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center h-full">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your inventory analysis report will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
